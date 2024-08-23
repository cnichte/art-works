import { AttachmentAction, AttachmentMeta } from "../common/types/AttachmentTypes";
import { Image_Util } from "./Image_Util";

/**
 * Defines the returned value.
 *
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @interface AttachmentToolReturnValue
 */
interface AttachmentToolReturnValue {
  attachmentsMeta: AttachmentMeta[];
  attachmentActions: AttachmentAction[];
}

/**
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 * @class AttachmentTool
 */
class AttachmentTool {
  /**
   * Processes the actions temporarily specified in formValues 'attachmentsMeta' Field,
   * and prepares the formValues 'attachmentsMeta' and 'attachments' for upload.
   *
   * Also separates the sidecar actions from 'attachmentsMeta':
   * removes them from 'attachmentsMeta',
   * and returns them seperated as attachmentActions[].
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   * @static
   * @param {*} valuesForm - The form values
   * @return { AttachmentToolReturnValue } AttachmentToolReturnValue
   * @memberof AttachmentTool
   */
  public static performActionsBeforeUpload(
    valuesForm: any,
    data:any
  ): AttachmentToolReturnValue {
    const attachmentActions: AttachmentAction[] = []; // nutze ich im Moment nicht mehr...

    // shorthands
    let attMeta: AttachmentMeta[] = [];

    // shorthands...
    if ('attachmentsMeta' in valuesForm) {
      attMeta = valuesForm.attachmentsMeta;
    }

    if (attMeta != null) {

      var i = attMeta.length;
      while (i--) {

        let metaItem = attMeta[i];

        console.log(metaItem);

        if ('action' in metaItem) {

          // Separate action from meta
          if(metaItem.action  !== undefined) {

            attachmentActions.push(metaItem.action);

            if (metaItem.action.name === 'upload') {

              // Here I have to convert again
              metaItem.action.attachment.data = Image_Util.get_base64String_from_base64URL(
                metaItem.action.attachment.data
              );
  
              // add attachment to data-object
              if(!('attachments' in data)){
                // data['attachments'] = {};
                Object.assign(data, { attachments: {} })
              }

              data.attachments[metaItem.id] = {
                content_type: metaItem.mimetype,
                data: metaItem.action.attachment.data
              }

              delete metaItem.action;

            } else if (metaItem.action.name === 'delete') {

              // remove attachment from data-object
              delete data.attachments[metaItem.id];
              attMeta.splice(i, 1);
              // Das metaItem aus der attMeta liste löschen
              // ...während durch die Liste gelooped wird
              // https://stackoverflow.com/questions/9882284/looping-through-array-and-removing-items-without-breaking-for-loop
            }
          } // if metaItem.action  !== undefined
          
        } else {
          // no action in it, do nothing
        }
      }
    }
    const returnValue: AttachmentToolReturnValue = {
      attachmentsMeta: attMeta,
      attachmentActions, // attachmentActions: attachmentActions
    };

    return returnValue;
  }
}

export { AttachmentTool, AttachmentToolReturnValue };
