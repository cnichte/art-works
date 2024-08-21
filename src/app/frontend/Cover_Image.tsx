import { ReactElement } from "react";

import { Image } from "antd";
import { AttachmentMeta } from "../common/types/AttachmentTypes";
import { Image_Util } from "./Image_Util";


export interface Cover_Image_Props {
  attachment_meta: AttachmentMeta[];
}

/**
 * A Cover-Image React-Component.
 *
 * @param props CoverImage_Props
 * @returns
 */
export function Cover_Image({ attachment_meta }: Cover_Image_Props) {

  /**
   * @param am AttachmentMeta[])
   * @returns 
   */
  function getCoverImages(am: AttachmentMeta[]): ReactElement {
    let image: ReactElement = (
      <Image src={Image_Util.image_src_fallback} height={40} />
    );

    if (am != null) {
      const result = am.filter((am: AttachmentMeta) => {
        return am.category === "werk" && am.is_cover;
      });

      if (result.length > 0) {
        image = (
          <Image
            src={result[0].preview}
            height={40}
            fallback={Image_Util.image_src_fallback}
          />
        );
      }
    }

    return image;
  }

  return <>{getCoverImages(attachment_meta)}</>;
}
