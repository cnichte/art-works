type AttachmentActionName = 'upload' | 'remove' | 'download' | 'delete' ;
type AttachmentActionPropertyName = 'attachmentActions';
// TODO das geht so nicht { AttachmentActionPropertyName: 'value' }

/**
 * Das entspricht dem, was in der CoucdDB abgespeichert wird.
 *
 * attachments: {
 *  'id': {
 *    content_type: 'text/plain',
 *    data: 'aGVsbG8gd29ybGQ='
 *  }, ...
 * }
 *
 * @interface Attachment
 */
interface Attachment {
  id: string;
  data: string;
  content_type: string;
}

/**
 * Falls ich Attachments separat zum Backend transportieren will.
 * um sie erst dort zu verarbeiten.
 *
 * @interface AttachmentAction
 */
interface AttachmentAction {
  name: AttachmentActionName;
  attachment: Attachment;
}

/**
 * Das wird von der REACT Komponente verarbeitet.
 *
 *
 * @interface AttachmentMeta
 */
interface AttachmentMeta {
  id: string;
  filename: string;
  mimetype: string;
  title: string;
  description: string;
  preview: string;
  action?: AttachmentAction;
}

export {
  Attachment,
  AttachmentMeta,
  AttachmentAction,
  type AttachmentActionName,
  type AttachmentActionPropertyName,
};
