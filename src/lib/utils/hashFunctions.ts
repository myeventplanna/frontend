/**
 * @param str - The string to hash
 * @param seed - The seed for the hash function
 * @returns The hash of the string
 *
 * Source:
 * https://gist.github.com/jlevy/c246006675becc446360a798e2b2d781
 * https://gist.github.com/TheOnlyBeardedBeast/e895d39f509fdcafe2fc1bac14fb2e48
 */
export function cyrb53Hasher(str: string, seed = 0): number {
	let h1 = 0xdeadbeef ^ seed,
		h2 = 0x41c6ce57 ^ seed
	for (let i = 0, ch; i < str.length; i++) {
		ch = str.charCodeAt(i)
		h1 = Math.imul(h1 ^ ch, 2654435761)
		h2 = Math.imul(h2 ^ ch, 1597334677)
	}
	h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507)
	h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909)
	h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507)
	h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909)

	return 4294967296 * (2097151 & h2) + (h1 >>> 0)
}
