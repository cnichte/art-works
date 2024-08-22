import { ReactElement } from "react";

import { Empty, Image } from "antd";
import { AttachmentMeta } from "../common/types/AttachmentTypes";
import { Image_Util } from "./Image_Util";

export interface Image_Cover_Props {
  attachment_meta: AttachmentMeta[];
}

export interface Image_Cover2_Props {
  image_string: string;
  height?: number;
  width?:number;
  ignore_size?: boolean;
}

/**
 * A Cover-Image React-Component.
 *
 * @param props CoverImage_Props
 * @returns
 */
export function Image_Cover({ attachment_meta }: Image_Cover_Props) {
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

export function Image_Cover2({
  image_string,
  height = 40,
  width = 40,
  ignore_size = false,
}: Image_Cover2_Props) {
  /**
   * @param am AttachmentMeta[])
   * @returns
   */
  function getCoverImages(image_string: string): ReactElement {
    let image: ReactElement = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />; //<Image src={Image_Util.image_src_fallback} />;

    if (image_string != null && image_string.length > 0) {
      if (ignore_size) {
        image = (
          <Image src={image_string} fallback={Image_Util.image_src_fallback} preview={false} />
        );
      } else {
        image = (
          <Image
            src={image_string}
            width={width}
            fallback={Image_Util.image_src_fallback}
            preview={false} 
          />
        );
      }
    }

    return image;
  }

  return <>{getCoverImages(image_string)}</>;
}
