import React, { useEffect, useState } from 'react';
import { Select, Tag } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
// import { TagInterface } from 'app/backend/docs/TagInterface';
import FormTools from './FormTools';

/** @type {*} Do some Database stuff... */
const IPC_CHANNEL = 'ipc-database';
/** @type {*} Do some Database stuff... */
const IPC_REQUEST = 'request:tags-find-custom';

/**
 * Reflects TagInterface from Database,
 * but 'slimmed down' for Formular purpose.
 *
 * TODO: Das Ding generisch machen
 * TODO: und für Tags und PublicationWhat, und PublicationMedium verwenden...
 *
 * @interface MyTag
 */
interface MyTag {
  id:string;
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
 * The React-Property Definition of MyTagsInput React-Component.
 * 'value' and 'onChange' must necessarily be called exactly that,
 * because they are used by the parent Andt Form.Item.
 * Dont rename them.
 *
 * @interface Props
 */
interface Props {
  // eslint-disable-next-line react/require-default-props
  value?: string[];
  // eslint-disable-next-line react/require-default-props
  onChange?: (value: string[]) => void;
}

/**
 ** MyTagsInput - React Component
 *
 * 'value' is an array with the uuids of the tags.
 *
 * @param param0
 * @returns
 */
function MyTagsInput({ value = [], onChange }: Props): any {
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
    FormTools.customRequest(IPC_CHANNEL, IPC_REQUEST, '', {});
  }, []);

  FormTools.customResponse(IPC_CHANNEL, IPC_REQUEST, (data) => {
    // Remember all available tags
    setAllTags(data.tags);

    // Publish the list of tag suggestions
    const options = data.tags
      .filter((aTag: MyTag) => {
        return aTag.children.length > 0 || aTag.parent.length === 0;
      })
      .map((aTag: MyTag) => {
        const obj:any = {
          label: aTag.name,
          value: aTag.id
        };

        if (aTag.children.length > 0) {
          obj.options = [];

          aTag.children.forEach((uuid) => {
            const ct: MyTag = getTagFromId(uuid, data.tags);
            if (ct != null) {
              obj.options.push({ label: ct.name, value: ct.id });
            }
          });
          return obj;
        }
        if (aTag!=null && aTag.parent.length > 0) {
          // has a parent, so has already been included in the list as a child
          // drop
        } else {
          // neither parent nor child, i.e. single...
          return obj;
        }
      });

    setTagOptions(options);
  });

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

    if (aTag!=null && aTag.parent.length > 0) {
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
      showArrow
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

export default MyTagsInput;

/*
  async function fetchTagList(tagName: string): Promise<TagInterface[]> {
    console.log('######### fetching Tags', tagName);
    // TODO REQUEST mit query search...
    // https://pouchdb.com/api.html#query_index
    FormTools.customRequest(
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
