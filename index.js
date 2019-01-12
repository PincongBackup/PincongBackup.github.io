// @ts-check

let page = 0
const n = 10

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

    /** @type {NodeListOf<HTMLDivElement>} */
    const itemsNodeList = document.querySelectorAll(".post-body-wrap[data-pagination]")

    /** @type {HTMLDivElement[]} */
    const items = Array.prototype.slice.call(itemsNodeList)
    const { length } = items

    // 显示/隐藏问题
    items.forEach((item) => {
        if (+item.dataset.pagination == page) {
            show(item)
        } else {
            hide(item)
        }
    })

    // 显示/隐藏上一页按钮
    const prevBtn = document.querySelector(".qpool-prev")
    if (page == 0) {
        hide(prevBtn)
    } else {
        show(prevBtn)
    }

    // 显示/隐藏下一页按钮
    const nextBtn = document.querySelector(".qpool-next")
    if (page >= Math.floor(length / n)) {
        hide(nextBtn)
    } else {
        show(nextBtn)
    }

}

