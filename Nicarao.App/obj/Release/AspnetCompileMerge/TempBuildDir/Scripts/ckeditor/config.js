/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function(config) {
	// Define changes to default configuration here. For example:
config.language = 'es';
    // config.uiColor = '#AADC6E';

    //config.toolbar = 'Full';

    //config.toolbar_Full =
	//[
	//	{ name: 'tools', items: ['Source', 'Preview', 'Bold', 'Italic', 'Underline', '-', 'Cut', 'Copy', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Print', 'Maximize', '-', 'NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
	//	'/',
	//	{ name: 'styles', items: ['Format', 'Font', 'FontSize'] },
	//];

//config.toolbar = [
  //       { name: 'clipboard', items: ['Cut', 'Copy', '-', 'Undo', 'Redo'] },
  //       { name: 'styles', items: ['Styles', 'Format'] },
  //       { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
  //       { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote'] },
  //       { name: 'editing', items: ['Scayt'] },
  //       { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
  //       { name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'SpecialChar'] },
  //       { name: 'tools', items: ['Maximize'] },
  //       { name: 'document', items: ['Source'] },
  //       { name: 'about', items: ['About'] }
  //   ];
    config.toolbar = [
        //{ name: 'document', items: ['Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates'] },
        { name: 'document', items: ['Print'] },
        { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
        { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'] },
        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'] },
        { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'] },
        { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
        { name: 'colors', items: ['TextColor', 'BGColor'] },
        { name: 'tools', items: ['Maximize', 'ShowBlocks'] },
    ];

    //config.toolbar_Single = [
    //    { name: 'clipboard', items: ['Cut', 'Copy', '-', 'Undo', 'Redo'] },
    //    { name: 'styles', items: ['Styles', 'Format'] },
    //    { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
    //    { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
    //    { name: 'editing', items: ['Scayt'] },
    //    { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
    //    { name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'SpecialChar'] },
    //    { name: 'tools', items: ['Maximize'] },
    //    { name: 'document', items: ['Source'] },
    //    { name: 'about', items: ['About'] }
    //];
    
    //config.toolbarGroups = [
    //    { name: 'clipboard', groups: ['clipboard', 'undo'] },
    //    { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
    //    { name: 'links', groups: ['links'] },
    //    { name: 'insert', groups: ['insert'] },
    //    { name: 'forms', groups: ['forms'] },
    //    { name: 'tools', groups: ['tools'] },
    //    { name: 'document', groups: ['mode', 'document', 'doctools'] },
    //    { name: 'others', groups: ['others'] },
    //    '/',
    //    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
    //    { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
    //    { name: 'styles', groups: ['styles'] },
    //    { name: 'colors', groups: ['colors'] },
    //    { name: 'about', groups: ['about'] }
    //];
};
