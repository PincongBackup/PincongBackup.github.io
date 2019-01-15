// @ts-check

(function () {

    let page = 0
    const n = 10

    /** @type {NodeListOf<HTMLDivElement>} */
    const itemsNodeList = document.querySelectorAll(".post-body-wrap[data-pagination]")

    /** @type {HTMLDivElement[]} */
    const items = Array.prototype.slice.call(itemsNodeList)
    const itemsLength = items.length

    /** @type {HTMLSpanElement} */
    const prevBtn = document.querySelector(".qpool-prev")
    /** @type {HTMLSpanElement} */
    const nextBtn = document.querySelector(".qpool-next")

    /**
     * 显示元素
     * @param {Element} element 
     */
    const show = (element) => {
        element.classList.remove("hidden")
    }

    /**
     * 隐藏元素
     * @param {Element} element 
     */
    const hide = (element) => {
        element.classList.add("hidden")
    }

    const onPagination = () => {

        // 显示/隐藏问题
        items.forEach((item) => {
            if (+item.dataset.pagination == page) {
                show(item)
            } else {
                hide(item)
            }
        })

        // 显示/隐藏上一页按钮
        if (page == 0) {
            hide(prevBtn)
        } else {
            show(prevBtn)
        }

        // 显示/隐藏下一页按钮
        if (page >= Math.floor(itemsLength / n)) {
            hide(nextBtn)
        } else {
            show(nextBtn)
        }

        window.scrollTo(0, 0)

    }

    prevBtn.onclick = () => {
        page = Math.max(0, page - 1)
        onPagination()
    }

    nextBtn.onclick = () => {
        page = Math.min(Math.floor(itemsLength / n), page + 1)
        onPagination()
    }

    onPagination()

})()
