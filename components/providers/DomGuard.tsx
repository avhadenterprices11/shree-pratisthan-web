"use client";

/**
 * DOM Reconciliation Guard for Next.js & React 19
 *
 * Prevents fatal unhandled runtime exceptions:
 * "NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node."
 * "NotFoundError: Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node."
 *
 * Root causes in production React apps:
 * 1. Third-party browser extensions (Google Translate, Grammarly, translation plugins)
 *    wrapping or moving text nodes and DOM elements into <font> or container tags.
 * 2. Animations & DOM manipulation libraries (GSAP pin-spacers, Framer Motion exit nodes,
 *    Lenis scroll containers, portals) moving elements during hot reloads or fast navigations.
 *
 * By safely checking child.parentNode before executing removeChild/insertBefore,
 * this guard delegates DOM removal/insertion to the actual parent or gracefully no-ops,
 * completely preventing white-screen crashes while preserving React's reconciliation.
 */

if (typeof window !== "undefined" && typeof Node !== "undefined") {
  const globalObj = window as unknown as { __DOM_GUARD_INSTALLED__?: boolean };

  if (!globalObj.__DOM_GUARD_INSTALLED__) {
    globalObj.__DOM_GUARD_INSTALLED__ = true;

    // 1. Guard Node.prototype.removeChild
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function <T extends Node>(child: T): T {
      if (!child) return child;

      // If the node's parent has been reparented outside 'this'
      if (child.parentNode !== this) {
        if (child.parentNode) {
          return child.parentNode.removeChild(child) as T;
        }
        return child;
      }

      try {
        return originalRemoveChild.call(this, child) as T;
      } catch (err: unknown) {
        const error = err as { name?: string; code?: number; message?: string };
        if (
          error?.name === "NotFoundError" ||
          error?.code === 8 ||
          error?.message?.includes("not a child of this node")
        ) {
          if (child.parentNode) {
            return child.parentNode.removeChild(child) as T;
          }
          return child;
        }
        throw err;
      }
    };

    // 2. Guard Node.prototype.insertBefore
    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function <T extends Node>(
      newNode: T,
      referenceNode: Node | null
    ): T {
      if (!newNode) return newNode;

      // If referenceNode is provided but is no longer a child of 'this'
      if (referenceNode && referenceNode.parentNode !== this) {
        if (referenceNode.parentNode) {
          return referenceNode.parentNode.insertBefore(newNode, referenceNode) as T;
        }
        return this.appendChild(newNode) as T;
      }

      try {
        return originalInsertBefore.call(this, newNode, referenceNode) as T;
      } catch (err: unknown) {
        const error = err as { name?: string; code?: number; message?: string };
        if (
          error?.name === "NotFoundError" ||
          error?.code === 8 ||
          error?.message?.includes("not a child of this node")
        ) {
          if (referenceNode && referenceNode.parentNode) {
            return referenceNode.parentNode.insertBefore(newNode, referenceNode) as T;
          }
          return this.appendChild(newNode) as T;
        }
        throw err;
      }
    };
  }
}

export function DomGuard() {
  return null;
}
