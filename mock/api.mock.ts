import { defineMock } from 'vite-plugin-mock-dev-server'

import { Urls } from '@/api/urls'
import { GroupListItem, ImgListItem } from '@/api/index'

const GroupList: GroupListItem[] = [
  {
    id: 1,
    name: 'DogGroup 1',
  },
  {
    id: 2,
    name: 'DogGroup 2',
  }
]

const ImgList: ImgListItem[] = [
  {
    id: 1,
    name: 'Dog 1',
    groupId: 1,
    path: 'https://images.dog.ceo/breeds/germanshepherd/n02106662_16342.jpg',
  },
  {
    id: 2,
    name: 'Dog 2',
    groupId: 1,
    path: 'https://images.dog.ceo/breeds/clumber/n02101556_1991.jpg',
  },
  {
    id: 3,
    name: 'Dog 3',
    groupId: 2,
    path: 'https://images.dog.ceo/breeds/terrier-norwich/n02094258_1003.jpg',
  },
  {
    id: 4,
    name: 'Dog 4',
    groupId: 2,
    path: 'https://images.dog.ceo/breeds/redbone/n02090379_5525.jpg',
  },
]

export default defineMock([
  {
    url: Urls.materialLibrary,
    method: 'GET',
    body: (option): BaseResponseWithArray<ImgListItem> => {
      const groupId = Number(option.query.groupId)
      const name = option.query.name
      let newImgList = ImgList
      if (groupId) {
        newImgList = newImgList.filter((item) => item.groupId === groupId)
      }
      if (name) {
        newImgList = newImgList.filter((item) => item.name.includes(name))
      }
      return {
        status: 200,
        message: 'success',
        data: {
          count: ImgList.length,
          rows: newImgList
        }
      }
    },
  }, {
    url: Urls.materialLibrary,
    method: 'DELETE',
    body: (option): BaseResponse => {
      const index = ImgList.findIndex((item) => item.id === Number(option.body.id))
      ImgList.splice(index, 1)
      return {
        status: 200,
        message: 'success',

      }
    },
  }, {
    url: Urls.materialLibraryGroup,
    method: 'GET',
    body: (option): BaseResponseWithArray<GroupListItem> => {
      return {
        status: 200,
        message: 'success',
        data: {
          count: GroupList.length,
          rows: GroupList
        }
      }
    },
  }, {
    url: Urls.materialLibraryGroup,
    method: 'POST',
    body: (option): BaseResponse => {
      const lastId = GroupList[GroupList.length - 1].id
      GroupList.push({
        id: lastId + 1,
        name: option.body.name,
      })

      return {
        status: 200,
        message: 'success',
      }
    },
  },
  {
    url: Urls.materialLibraryGroup,
    method: 'DELETE',
    body: (option): BaseResponse => {
      const index = GroupList.findIndex((item) => item.id === Number(option.body.id))
      GroupList.splice(index, 1)
      return {
        status: 200,
        message: 'success',
      }
    }
  }, {
    url: '/api/ossPut',
    method: 'POST',
    body: (option): BaseResponse => {
      const index = GroupList.findIndex((item) => item.id === Number(option.body.id))
      GroupList.splice(index, 1)
      return {
        status: 200,
        message: 'success',
      }
    }
  }
])
