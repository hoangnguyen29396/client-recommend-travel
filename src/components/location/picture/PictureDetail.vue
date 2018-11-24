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
              <button class="btn btn-primary" @click="createPicture({file, locationId})" type="submit">Add</button>
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
import { mapState, mapActions } from 'vuex'
import PictureElement from './PictureElement'

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
      file: ''
    }
  },
  computed: {
    ...mapState('picture', [
      'pictures'
    ])
  },
  mounted () {
    this.fetchPictures(this.locationId)
  },
  methods: {
    ...mapActions('picture', [
      'fetchPictures',
      'createPicture',
      'deletePicture'
    ]),
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    }
  }
}
</script>
