import React, { useEffect, useState } from "react";
import { Select, Tag } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { FormItem_Props } from "../common/types/FormPropertiesInterface";
import { DB_Request } from "../common/types/RequestTypes";
import { IPC_DATABASE } from "../common/types/IPC_Channels";
import { DocType } from "../common/types/DocType";
import { App_Messages_IPC } from "./App_Messages_IPC";
// import { TagInterface } from 'app/backend/docs/TagInterface';

/** @type {*} Do some Database stuff... */
const IPC_CHANNEL = "ipc-database";
/** @type {*} Do some Database stuff... */
const IPC_REQUEST = "request:tags-find-custom";

/**
 * Reflects TagInterface from Database,
 * but 'slimmed down' for Formular purpose.
 *
 * TODO: Das Ding generisch machen: MySelectMulti_Input
 * TODO: und für Tags und PublicationWhat, und PublicationMedium verwenden...
 *
 * @interface MyTag
 */
interface MyTag {
  id: string;
  name: string;
  color: string;
  shortnote: string;
  parent: string;
  children: string[];
}

/* ==========================================================

    * Helper Functions

   ========================================================== */

/**
 * Get the Tag with uuid = id.
 *
 * @param id
 * @returns the Tags data
 */
function getTagFromId(id: string, tags: MyTag[]): MyTag | null {
  let result = null;
  for (let i = 0; i < tags.length; i += 1) {
    if (tags[i].id === id) {
      result = tags[i];
      break;
    }
  }
  return result;
}

/* ==========================================================

    * MyTags - ReactNode / Main Component.

   ========================================================== */

/**
 ** MyTags_Input - React Component
 *
 * 'value' is an array with the uuids of the tags.
 *
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 * 
 * @param param0
 * @returns
 */
function MyTags_Input({ value = [], onChange }: FormItem_Props<string[]>): any {
  // console.log('MyTags - value', value);

  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  // The supply of tags
  const [allTags, setAllTags] = useState<MyTag[]>([]);
  const [tagOptions, setTagOptions] = useState([]);

  // The selected tags
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);

  /* ----------------------------------------------------------

    Actions

    ---------------------------------------------------------- */

  useEffect(() => {
    // Get all tags from the database, for the suggestion list
    const doctype: DocType = "tag";
    const segment: string = "tags";

    const request: DB_Request = {
      type: "request:list-all",
      doctype: doctype,
      id: "",
      options: {},
    };

    window.electronAPI
      .invoke_request(IPC_DATABASE, [request])
      .then((result: any) => {
        setAllTags(result[segment]);

        // Publish the list of tag suggestions
        const options = result[segment]
          .filter((aTag: MyTag) => {
            return aTag.children.length > 0 || aTag.parent.length === 0;
          })
          .map((aTag: MyTag) => {
            const obj: any = {
              label: aTag.name,
              value: aTag.id,
            };

            if (aTag.children.length > 0) {
              obj.options = [];

              aTag.children.forEach((uuid) => {
                const ct: MyTag = getTagFromId(uuid, result[segment]);
                if (ct != null) {
                  obj.options.push({ label: ct.name, value: ct.id });
                }
              });
              return obj;
            }
            if (aTag != null && aTag.parent.length > 0) {
              // has a parent, so has already been included in the list as a child
              // drop
            } else {
              // neither parent nor child, i.e. single...
              return obj;
            }
          });

        setTagOptions(options);
      })
      .catch(function (error: any) {
        App_Messages_IPC.request_message(
          "request:message-error",
          error instanceof Error ? `Error: ${error.message}` : ""
        );
      });
  }, []);

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

    const aTag: MyTag | null = getTagFromId(renderValue, allTags);
    let parent: MyTag | null = null;

    if (aTag != null && aTag.parent.length > 0) {
      parent = getTagFromId(aTag.parent, allTags);
    }

    return (
      <Tag
        color={aTag != null ? `${aTag.color}` : ``}
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
      showArrow // suffixIcon=null
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

export default MyTags_Input;

/*
  async function fetchTagList(tagName: string): Promise<TagInterface[]> {
    console.log('######### fetching Tags', tagName);
    // TODO REQUEST mit query search...
    // https://pouchdb.com/api.html#query_index
    FormTool.customRequest(
      'ipc-database',
      'request:tags-find-custom',
      tagName,
      {
        use_index: 'tagsIndex',
        selector: { name: tagName },
      }
    );
  }
*/
