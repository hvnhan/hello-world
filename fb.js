fbads.js text/javascript
(() => {
 
    let elementRouting = {}
    const REMOVE_SUGGESTION = true
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
 
    function getFeed() {
        if(!elementRouting?.feed) elementRouting.feed = findFeed()
        return elementRouting.feed
    }
 
    function findFeed() {
        let divs = document.querySelectorAll('div')
        for(const div of divs)
            if(Object.values(div)?.[1]?.children?.props?.id === 'feed')
                return div
        return elementRouting?.feed
    }
 
    setInterval(()=> elementRouting.feed = findFeed(), 5000) //relocate new feed source occasionally
 
    function feedletsFilter(element) {
        let isFeed = Object.values(element)?.[1]?.children?.props?.variables?.feedLocation !== undefined
        return isFeed
    }
 
    function getFeedItems() {
        let feedRoot = getFeed()
        let feedItems = Array.from(feedRoot.querySelectorAll('div')).filter(feedletsFilter)
        return feedItems
    }
 
    function isAdvert(element) {
        let props = Object.values(element)?.[1]?.children?.props
        try {
            let feedID = atob(props.story.id)
            if(feedID.length > 700) return true
        } catch { return false }
        return false
    }
 
    function removeFromPage(element) {
        element.style.display = 'none'
    }
 
    function removeStuff() {
        let feedItems = getFeedItems()
 
        for(const advert of feedItems.filter(isAdvert))
           removeFromPage(advert)
 
        if(REMOVE_SUGGESTION)
            for(const feedItem of feedItems)
                if(feedItem.innerHTML.includes(">Suggested for you</span>")) removeFromPage(feedItem)
    }
 
    async function advertKillingLoop() {
        while(true) {
            try {
                removeStuff()
            } catch {}
            await sleep(250)
        }
    }
 
    window.addEventListener('load', advertKillingLoop)
 
})();
