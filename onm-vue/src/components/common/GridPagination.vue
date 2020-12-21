<template>

<div id="page-navigation">
  <button>Back</button>
  <p>{{startRow / rowsPerPage + 1}} out of {{Math.ceil(filteredData.length / rowsPerPage)}}</p>
  <button>Next</button>
</div>

</template>


<script>
export default {
    methods: {
        movePages: function(amount) {
            let newStartRow = this.startRow + (amount * this.rowsPerPage);
            if (newStartRow >= 0 && newStartRow < this.filteredData.length) {
                this.startRow = newStartRow;
            }
        },
        dataPerPage: function() {
        return this.filteredData.filter((item, index) => index >= this.startRow && index < (this.startRow + this.rowsPerPage))
        }
    },
}
</script>