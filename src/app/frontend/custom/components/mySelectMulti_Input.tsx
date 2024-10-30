import React, { useEffect, useState } from "react";
import { Select, Tag } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { FormItem_Props } from "../../../common/framework/types/system/FormPropertiesInterface";
import { IPC_DATABASE } from "../../../common/framework/types/system/IPC_Channels";
import { DB_Request } from "../../../common/framework/types/system/RequestTypes";
import { DocType } from "../../../common/types/DocType";
import { App_Messages_IPC } from "../../framework/tools/App_Messages_IPC";

// import { TagInterface } from 'app/backend/docs/TagInterface';

/** @type {*} Do some Database stuff... */
const IPC_CHANNEL = "ipc-database";

interface MyIdentifiable {
  id?: string;
  name?: string;
}

interface MySelectMulti_InputProps extends FormItem_Props<string[]> {
  doctype: DocType;
  segment: string;
}

/* ==========================================================

    * Generic Multi Select Box - ReactNode / Main Component.

   ========================================================== */

/**
 ** MySelectMulti_Input - React Component
 *
 * TODO: Das hier ersetzt alle anderen
 * - MyTags_Input
 * - PublicationWhat
 * - PublicationMedium usw
 *
 * 'value' is an array with the uuids of the tags.
 * 
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 *
 * @param param0
 * @returns
 */
export function MySelectMulti_Input<T extends MyIdentifiable>({
  value = [],
  doctype,
  segment,
  onChange,
}: MySelectMulti_InputProps): any {
  // console.log('MyTags - value', value);

  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  // The supply of tags
  const [allTags, setAllTags] = useState<T[]>([]);
  const [tagOptions, setTagOptions] = useState([]);

  // The selected tags
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);

  /* ----------------------------------------------------------

    Actions

    ---------------------------------------------------------- */

    useEffect(() => {
    // Beim laden der Seite...
    // Get all tags from the database, for the suggestion list

    const request: DB_Request = {
      request_type: "request:list-all",
      doctype: doctype,
      query:{
        selector: { docType: doctype }
      },
      request_options: ["use_relation"],
    };

    window.electronAPI
      .invoke_request(IPC_DATABASE, [request])
      .then((result: any) => {
        setAllTags(result[segment]);

        // Remember all available tags
        if (result != null && segment in result) {
          const op = result[segment].map((aTag: T) => {
            const obj: any = {
              label: aTag.name,
              value: aTag.id,
            };
            return obj;
          });

          setTagOptions(op);
        }
      })
      .catch(function (error: any) {
        App_Messages_IPC.request_message(
          "request:message-error",
          error instanceof Error ? `Error: ${error.message}` : ""
        );
      });
  }, []);

  /*
  FormTool.customResponse(IPC_CHANNEL, ipc_request, (data) => {
    const module = RequestFactory.get_module_from_request(ipc_request);
    setAllTags(data[module]);

    // Remember all available tags
    if (data != null && module in data) {
      const op = data[module].map((aTag: T) => {
        const obj: any = {
          label: aTag.name,
          value: aTag.id,
        };
        return obj;
      });

      setTagOptions(op);
    }
  });
*/
  /**
   * Get the Tag with uuid = id.
   *
   * @param id
   * @returns the Tags data
   */
  function getTagFromId(id: string, tags: T[]): T | null {
    let result = null;
    for (let i = 0; i < tags.length; i += 1) {
      if (tags[i].id === id) {
        result = tags[i];
        break;
      }
    }
    return result;
  }

  const triggerChange = (changedValue: string[]) => {
    onChange?.(changedValue);
  };

  const renderTag = (propsRender: CustomTagProps) => {
    const { label, value: renderValue, closable, onClose } = propsRender;
    // value holds the uuid,
    // value is already defined in the upper scope.
    // So that it doesnt overlap, rename/define it here as renderValue.

    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const aTag: T | null = getTagFromId(renderValue, allTags);

    return (
      <Tag
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {parent != null ? `${parent.name}: ${label}` : `${label}`}
      </Tag>
    );
  };

  /* ----------------------------------------------------------

     View -  Data gets dynamically adjusted

    ---------------------------------------------------------- */
  return (
    <Select
      mode="multiple"
      // suffixIcon={null} // hide icon
      tagRender={renderTag}
      value={value || selectedTags} // TODO hier passiert noch nix!?
      defaultValue={[]}
      options={tagOptions}
      onDeselect={(optionValue: any) => {
        const clonedTags = Array.from(selectedTags);
        // remove Tag
        clonedTags.forEach((item, index) => {
          if (item === optionValue) clonedTags.splice(index, 1);
        });
        setSelectedTags(clonedTags);
        triggerChange(clonedTags);
      }}
      onSelect={(optionValue: any) => {
        const clonedTags = Array.from(selectedTags);
        // add Tag
        clonedTags.push(optionValue);
        setSelectedTags(clonedTags);
        triggerChange(clonedTags);
      }}
    />
  );
}
