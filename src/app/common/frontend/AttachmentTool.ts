import {
  Attachment,
  AttachmentAction,
  AttachmentMeta,
} from './types/AttachmentTypes';

/**
 * Defines the returned value.
 *
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @interface AttachmentToolReturnValue
 */
interface AttachmentToolReturnValue {
  attachmentsMeta: AttachmentMeta[];
  attachments: Attachment[];
  attachmentActions: AttachmentAction[];
}

/**
 *
 * @author Carsten Nichte - //carsten-nichte.de/apps/
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
    valuesForm: any
  ): AttachmentToolReturnValue {
    const attachmentActions: AttachmentAction[] = []; // nutze ich im Moment nicht mehr...

    // Methode zum konvertieren von DataURL String zu bas64String
    const getBase64StringFromBase64URL = (dataURL: string) =>
      dataURL.replace('data:', '').replace(/^.+,/, '');

    // shorthands
    let attMeta: AttachmentMeta[] = [];
    let att: Attachment[] = [];

    // shorthands...
    if ('attachmentsMeta' in valuesForm) {
      attMeta = valuesForm.attachmentsMeta;
    }
    if ('attachments' in valuesForm) {
      att = valuesForm.attachments;
    }

    if (attMeta != null && attMeta !== null) {
      attMeta.forEach((metaItem) => {
        if ('action' in metaItem) {
          // Separate action from meta

          if(metaItem.action  !== undefined) {
            attachmentActions.push(metaItem.action);
            if (metaItem.action.name === 'upload') {
              // Here I have to convert again
              metaItem.action.attachment.data = getBase64StringFromBase64URL(
                metaItem.action.attachment.data
              );
  
              // Embed attachment directly in the document
              // attachments: { 'uuid1': { content_type: 'text/plain',  data: 'aGVsbG8gd29ybGQ=' },
              att[metaItem.id as any] = metaItem.action.attachment;
  
              delete metaItem.action;
            } else if (metaItem.action.name === 'delete') {
              // Das metaItem aus der attMeta liste löschen
              // ...während durch die Liste gelooped wird
              // TODO UNSAUBER, das könnte crashen... vielleicht mit filter arbeiten?
              // https://stackoverflow.com/questions/9882284/looping-through-array-and-removing-items-without-breaking-for-loop
              attMeta.every((metaFormItem) => {
                if (metaFormItem.id === metaItem.id) {
                  // remove metaItem from metaForm
                  const index = attMeta.indexOf(metaItem);
                  const newMetaList = attMeta.slice();
                  newMetaList.splice(index, 1);
                  attMeta = newMetaList;
  
                  // remove attachmentItem from attachmentsForm
                  if(metaItem.action !== undefined){
                    const i = att.indexOf(metaItem.action.attachment);
                    const newAttList = att.slice();
                    newAttList.splice(i, 1);
                    att = newAttList;
                  }

                  return false; // break
                }
                return true; // continue next
              });
            }
          } // if metaItem.action  !== undefined
          
        } else {
          // no action in it, do nothing
        }
      });
    }
    const returnValue: AttachmentToolReturnValue = {
      attachmentsMeta: attMeta,
      attachments: att,
      attachmentActions, // attachmentActions: attachmentActions
    };

    return returnValue;
  }
}

export { AttachmentTool, AttachmentToolReturnValue };
