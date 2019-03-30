<template>
    <div class="vuejs-paginate-simple">
        <ul class="pagination">
            <li class="page-item navi" :class="{'disabled': currentPage === 1}"><a tabindex="-1" @click="pickPage(1)" class="page-link"><span>«</span></a></li>
            <li class="page-item navi" :class="{'disabled': currentPage === 1}"><a tabindex="-1" @click="movePage(-1)" class="page-link"><span>‹</span></a></li>

            <li v-for="(page, index) in pages" :key="index" class="page-item" :class="{'active': currentPage === page}">
                <a @click="pickPage(page)" tabindex="-1" class="page-link">{{ page }}</a>
            </li>

            <li class="page-item navi" :class="{'disabled': currentPage >= totalPages}"><a @click="movePage(1)" tabindex="-1" class="page-link"><span>›</span></a></li>
            <li class="page-item navi" :class="{'disabled': currentPage >= totalPages}"><a @click="pickPage(totalPages)" tabindex="-1" class="page-link"><span>»</span></a></li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        totalResult: Number,
        pageCount: {
            default: 5,
            type: Number
        },
        rowsPerPage: {
            default: 10,
            type: Number
        },
        value: {
			type: Number,
			default: 1
		}
    },
    data() {
        return {
            currentPage: this.value
        }
    },
    computed: {
        pageCountLimit() {
            return this.pageCount
        },
        totalPages() {
            return Math.ceil(this.totalResult / this.rowsPerPage)
        },
        padding() {
            return Math.floor(this.pageCountLimit / 2)
        },
        pages() {
            const pages = []
            const index = this.currentPage - this.padding;
            const start = index < 1 ? 1 : index + this.pageCountLimit > this.totalPages ? this.totalPages - this.pageCountLimit + 1 : index
            const end = start + (this.pageCountLimit > this.totalPages ? this.totalPages || 1 : this.pageCountLimit)
            
            for (let i = start; i < end; i++) {
                pages.push(i)
            }

            return pages
        },
    },
    watch: {
        value(val) {
			this.currentPage = val
		},
        currentPage() {
            if (this.currentPage < 1) this.currentPage = 1
            else if (this.currentPage > this.totalPages) this.currentPage = this.totalPages
            this.$emit('input', this.currentPage)
        }
    },
    methods: {
        pickPage(pageNum) {
            this.currentPage = pageNum
        },
        movePage(moveNum) {
            this.currentPage = ((Math.ceil(this.currentPage / this.pageCountLimit) + moveNum) * this.pageCountLimit) - this.pageCountLimit + 1
        }
    }
}
</script>
