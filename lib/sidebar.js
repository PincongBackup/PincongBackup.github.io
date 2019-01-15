// @ts-check

(function () {

    /**
     * @typedef {Object} Post
     * @property {string} title
     * @property {string} url
     */

    /**
     * @typedef {Object} HotTopicObj
     * @property {string} name
     * @property {number} size
     * @property {Post[]} last_3_posts
     */

    /**
     * @type {typeof document.createElement}
     */
    const c = (tagName) => document.createElement(tagName)

    /** @type {string} */
    const baseUrl = window.baseUrl || ""

    /**
     * @param {HotTopicObj} hotTopicObj 
     */
    const createSidebarHotTopicsItem = (hotTopicObj) => {

        const rootDiv = c("div")
        rootDiv.classList.add("user-detail-item")

        const tagA = c("a")
        tagA.classList.add("tag")
        tagA.href = `${baseUrl}/tags.html#${hotTopicObj.name}`
        tagA.text = hotTopicObj.name

        const br = c("br")

        const infoDiv = c("div")
        infoDiv.classList.add("user-detail-tag-info")

        const sizeSpan = c("span")
        sizeSpan.classList.add("btn-gray")
        sizeSpan.textContent = `${hotTopicObj.size}个问题`

        const postsDivList = hotTopicObj.last_3_posts.map((post) => {

            const postDiv = c("div")
            postDiv.classList.add("tags-post-title")

            const postA = c("a")
            postA.target = "_blank"
            postA.href = baseUrl + post.url
            postA.title = post.title
            postA.text = post.title

            postDiv.append(postA)

            return postDiv

        })

        infoDiv.append.apply(infoDiv, [sizeSpan].concat(postsDivList))

        rootDiv.append(tagA, br, infoDiv)

        return rootDiv
    }

    /**
     * @param {HotTopicObj[]} hotTopicsJson 
     */
    const createSidebarHotTopics = (hotTopicsJson) => {

        const el = document.querySelector(".sidebar .user-detail-action-cnt")

        const items = hotTopicsJson.map((obj) => {
            return createSidebarHotTopicsItem(obj)
        })

        el.append.apply(el, items)

    }

    /**
     * 发起 XHR 请求，兼容 IE
     * @param {string} url 
     * @param { (json: any) => any } callback 
     */
    const makeRequest = (url, callback) => {
        const httpRequest = new XMLHttpRequest()

        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    const text = httpRequest.responseText
                    try {
                        callback(JSON.parse(text))
                    } catch (e) {
                        console.error(e)
                    }
                } else {
                    console.error(httpRequest.status, httpRequest.statusText, httpRequest)
                }
            }
        };

        httpRequest.open('GET', url, true)
        httpRequest.send()
    }

    makeRequest(`${baseUrl}/data/hot_topics.json`, createSidebarHotTopics)

})()

