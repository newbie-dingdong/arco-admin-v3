import { defineStore } from 'pinia'
import { type LocationQuery, type RouteParams } from 'vue-router'
import { computed } from 'vue'
import router from '@/router'

export interface TagItem {
  name: string
  title: string
  catch: boolean
  query: LocationQuery
  params: RouteParams
}

const useTags = defineStore(
  'useTags',
  () => {
    const activeName = ref<string>('')
    const tagList = ref<TagItem[]>([])
    // 需要缓存的页面
    const isCatchRoute = computed<TagItem[]>(() => tagList.value.filter((item) => item.catch))

    const setActiveName = (name: string) => {
      activeName.value = name
    }

    const checkTag = (tag: TagItem) => {
      router.push({
        name: tag.name,
        query: tag.query,
        params: tag.params
      })
    }

    const removeTag = (index: number) => {
      const currentIndex = tagList.value.findIndex((item) => item.name === activeName.value)
      tagList.value.splice(index, 1)
      if (index > 0 && index == currentIndex) {
        checkTag(tagList.value[index - 1])
      }
    }
    
    const addTag = (tag: TagItem) => {
      if(tag.name=='login' || !tag.title) 
return
      setActiveName(tag.name)
      const needRemoveIndex = tagList.value.findIndex((item) => item.name != activeName.value)
      if (tagList.value.length > 20 && needRemoveIndex > -1) {
        removeTag(needRemoveIndex)
      } else {
        const findIndex = tagList.value.findIndex((item) => item.name === tag.name)
        if (findIndex > -1) 
return
        tagList.value.push(tag)
      }
    }

    const clearTags = () => {
      tagList.value = []
    }

    return {
      tagList,
      isCatchRoute,
      clearTags,
      addTag,
      checkTag,
      removeTag,
      activeName
    }
  },
  {
    persist: true
  }
)

export default useTags
