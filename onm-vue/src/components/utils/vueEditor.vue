<template>
  <div id="app">
    <vue-editor
      id="editor"
      v-model="content"
      :editorOptions="editorSettings"
    >
    </vue-editor>
  </div>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";
import axios from "axios";
import { ImageDrop } from 'quill-image-drop-module'
// import ImageResize from 'quill-image-resize-module'

Quill.register('modules/imageDrop', ImageDrop)
// Quill.register('modules/imageResize', ImageResize)
export default {
  components: {
    VueEditor
  },

  data() {
    return {
      htmlForEditor: "",
      content:"",
        editorSettings: {
          modules: {
            imageDrop: true,
            // imageResize: {}
          }
        }
    };
  },

  methods: {
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("image", file);

      axios({
        url: "https://fakeapi.yoursite.com/images",
        method: "POST",
        data: formData
      })
        .then(result => {
          const url = result.data.url; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSavingContent: function() {
      // You have the content to save
      console.log(this.content);
      this.content = ""
    }

  }
};
</script>

<style>

</style>