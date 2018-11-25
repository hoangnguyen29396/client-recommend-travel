<template>
  <div class="row clearfix">
    <div class="col-lg-12">
      <div class="card">
        <div class="header">
          <h2>Picture</h2>
        </div>
        <div class="body">
          <div class="row clearfix">
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div class="form-group">
                <input type="file" ref="file" v-on:change="handleFileUpload()" class="form-control" placeholder="Enter place type">
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
              <button class="btn btn-primary" @click="createPicture(locationId, file)" type="submit">Add</button>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Picture</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <picture-element v-for="picture in pictures" :key="picture.id"
                  :picture="picture" @delete-picture="deletePicture"/>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PictureElement from './PictureElement'
import PictureService from '@/services/picture'

export default {
  props: {
    locationId: {
      required: true
    }
  },
  components: {
    PictureElement
  },
  data () {
    return {
      file: '',
      pictures: []
    }
  },
  computed: {
  },
  created () {
    this.fetchPictures(this.locationId)
  },
  methods: {
    fetchPictures (locationId) {
      const service = new PictureService()
      service.fetchPictures(locationId)
        .then(response => {
          this.pictures = response.data.data
        })
        .catch(() => {
          alert('error')
        })
    },
    createPicture (locationId, file) {
      const service = new PictureService()
      let formData = new FormData()
      formData.append('file', file)
      formData.append('idLocation', locationId)
      service.createPicture(formData)
        .then(response => {
          this.pictures.unshift(response.data.data)
        })
        .catch(() => {
          alert('error')
        })
    },
    deletePicture (picture) {
      const service = new PictureService()
      service.deletePicture(picture)
        .then(() => {
          let pictureIndex = this.pictures.findIndex(_picture => _picture.id === picture.id)
          this.pictures.splice(pictureIndex, 1)
        })
        .catch(() => {
          alert('error')
        })
    },
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    }
  }
}
</script>
