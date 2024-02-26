/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function (config) {
    // Define changes to default configuration here. For example:
    config.language = 'es';
    config.defaultLanguage = 'es';
    
    config.toolbar_Single = [
        { name: 'clipboard', items: ['Cut', 'Copy', '-', 'Undo', 'Redo'] },
        { name: 'styles', items: ['Styles', 'Format'] },
        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
        { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote'] },
        { name: 'editing', items: ['Scayt'] },
        { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
        { name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'SpecialChar'] },
        { name: 'tools', items: ['Maximize'] },
        //{ name: 'document', items: ['Source'] },
        { name: 'about', items: ['About'] }
    ];
    
};
