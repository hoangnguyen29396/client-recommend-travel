<template>
  <div class="row clearfix">
    <div class="col-lg-12">
      <div class="card">
        <div class="body">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li @click="onClickFirstPage">
                <a class="page-link" aria-label="First">
                <span aria-hidden="true">First</span>
                </a>
              </li>
              <li>
                <a class="page-link" aria-label="Previous" @click="onClickPreviousPage">
                <span aria-hidden="true">«</span>
                <span class="sr-only">Previous</span>
                </a>
              </li>
              <li v-for="page in pages" :key="page.name" :class="{ active: isPageActive(page.name) }" @click="onClickPage(page.name)">
                <a class="page-link">{{ page.name }}</a>
              </li>
              <li>
                <a class="page-link" aria-label="Next" @click="onClickNextPage">
                <span aria-hidden="true">»</span>
                <span class="sr-only">Next</span>
                </a>
              </li>
              <li @click="onClickLastPage">
                <a class="page-link" aria-label="Last">
                <span aria-hidden="true">Last</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 10
    },
    totalPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    startPage () {
      if (this.currentPage === 1) {
        return 1
      }
      if (this.currentPage === this.totalPages) {
        if (this.totalPages > this.maxVisibleButtons) {
          return this.totalPages - this.maxVisibleButtons + 1
        } else {
          return 1
        }
      }
      return this.currentPage - 1
    },
    endPage () {
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages)
    },
    pages () {
      const range = []
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        })
      }
      return range
    },
    isInFirstPage () {
      return this.currentPage === 1
    },
    isInLastPage () {
      return this.currentPage === this.totalPages
    }
  },
  methods: {
    onClickFirstPage () {
      this.$emit('pagechanged', 1)
    },
    onClickPreviousPage () {
      this.$emit('pagechanged', this.currentPage - 1)
    },
    onClickPage (page) {
      this.$emit('pagechanged', page)
    },
    onClickNextPage () {
      this.$emit('pagechanged', this.currentPage + 1)
    },
    onClickLastPage () {
      this.$emit('pagechanged', this.totalPages)
    },
    isPageActive (page) {
      return this.currentPage === page
    }
  }
}
</script>
