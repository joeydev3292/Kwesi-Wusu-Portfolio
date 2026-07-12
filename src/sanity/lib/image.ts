// Image URL builder — available for use when rendering Sanity images
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source: SanityImageSource) {
  return builder?.image(source);
}
