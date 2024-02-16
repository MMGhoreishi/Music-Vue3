<template>
  <upload-song
    :addSong="addSong"
    :validationSong="validationSong"
    :changeValidationSong="changeValidationSong"
    :validationCover="validationCover"
    :changeValidationCover="changeValidationCover"
    :btnClicked="btnClicked"
    :changeSongId="changeSongId"
    :changeBtnClicked="changeBtnClicked"
  />
  <upload-cover
    :songId="songId"
    :btnClicked="btnClicked"
    :changeBtnClicked="changeBtnClicked"
    :validationSong="validationSong"
    :changeValidationSong="changeValidationSong"
    :validationCover="validationCover"
    :changeValidationCover="changeValidationCover"
  />
  <div class="mb-2"></div>

  <button-el
    type="submit"
    text="Upload Music"
    :disabled="btnClicked"
    :bgClr="'violet-500'"
    txtClr="white"
    :hvrBg="'violet-600'"
    hvrTxt="white"
    :roundedFull="true"
    :click="changeBtnClickedTrue"
  />
</template>

<script>
export default {
  name: 'UploadFile',
  props: {
    addSong: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      songId: '',
      btnClicked: false,
      validationSong: false,
      validationCover: false
    }
  },
  methods: {
    changeValidationSong(value) {
      this.validationSong = value
    },
    changeValidationCover(value) {
      this.validationCover = value
    },
    changeBtnClickedTrue() {
      this.btnClicked = true
    },
    changeBtnClicked(value) {
      this.btnClicked = value
    },
    changeSongId(value) {
      this.songId = value
    }
  }
}
</script>
