<template>
    <div class="component">
        <ul class="pagination">
            <li class="page-item" :class="{'disabled': currentPageNum === 1}"><a tabindex="-1" @click="pickPage(1)" class="page-link"><span>«</span></a></li>
            <li class="page-item" :class="{'disabled': currentPageNum === 1}"><a tabindex="-1" @click="movePage(-1)" class="page-link"><span>‹</span></a></li>

            <li v-for="(page, index) in pages" :key="index" class="page-item" :class="{'active': currentPageNum === page}">
                <a @click="pickPage(page)" tabindex="-1" class="page-link">{{ page }}</a>
            </li>

            <li class="page-item" :class="{'disabled': currentPageNum >= totalPages}"><a @click="movePage(1)" tabindex="-1" class="page-link"><span>›</span></a></li>
            <li class="page-item" :class="{'disabled': currentPageNum >= totalPages}"><a @click="pickPage(totalPages)" tabindex="-1" class="page-link"><span>»</span></a></li>
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
        current: {
            default: 1,
            type: Number
        },
        action: Function
    },
    data() {
        return {
            padding: Math.floor(this.pageCount / 2),
            totalPages: Math.ceil(this.totalResult / this.rowsPerPage),
            currentPageNum: this.current
        }
    },
    computed: {
        currentPages() {
            return Math.ceil(this.currentPageNum / this.pageCount)
        },
        pages() {
            const pages = []
            const index = this.currentPageNum - this.padding;
            const start = index < 1 ? 1 : index + this.pageCount > this.totalPages ? this.totalPages - this.pageCount + 1 : index
            const end = start + (this.pageCount > this.totalPages ? this.totalPages || 1 : this.pageCount)
            
            for (let i = start; i < end; i++) {
                pages.push(i)
            }

            return pages
        },
    },
    watch: {
        totalResult() {
            this.totalPages = Math.ceil(this.totalResult / this.rowsPerPage)
        },
        currentPageNum() {
            if (this.currentPageNum < 1) this.currentPageNum = 1
            else if (this.currentPageNum > this.totalPages) this.currentPageNum = this.totalPages

            if (typeof this.action === 'function') this.action(this.currentPageNum)
        }
    },
    methods: {
        pickPage(pageNum) {
            this.currentPageNum = pageNum
        },
        movePage(moveNum) {
            this.currentPageNum = ((Math.ceil(this.currentPageNum / this.pageCount) + moveNum) * this.pageCount) - this.pageCount + 1
        }
    }
}
</script>
