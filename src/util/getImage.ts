import client from "../lib/sanity";

import { useNextSanityImage } from "next-sanity-image";

export default function GetImage(
  image: any,
  CustomImageBuilder = null
): any {
  const imageProps = useNextSanityImage(client, image, {
    imageBuilder: CustomImageBuilder,
  });
  if (!image || !image.asset) {
    return null;
  }
  return imageProps;
}
