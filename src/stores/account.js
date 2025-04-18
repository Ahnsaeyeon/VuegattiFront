// 회원정보 불러오는 코드
// 필요 시 함수 추가하여 사용
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/utils/axios'

export const useAccount = defineStore('account', () => {
  // 상태 선언
  const accountInfo = ref([])

  // 회원정보 불러오기
  const fetchAccount = async () => {
    try {
      const response = await apiClient.get('/account')
      console.log('account API 응답:', response.data) //응답상태 확인용
      accountInfo.value = response.data
      console.log('회원정보 로딩 성공: ', response.data)
    } catch (err) {
      console.log('회원정보 로딩 에러: ', err)
    }
  }
  // 특정 회원정보 불러오기
  const fetchAccountById = async userId => {
    try {
      const response = await apiClient.get(`/account/${userId}`)
      console.log('특정 회원정보 로딩 성공: ', response.data)
      return response.data
    } catch (err) {
      console.log('특정 회원정보 로딩 에러: ', err)
    }
  }

  // 회원정보 업데이트
  const updateAccount = async accountData => {
    console.log('updateAccount 함수 호출됨', accountData) //
    try {
      const response = await apiClient.post('/account', accountData)
      accountInfo.value = response.data
      console.log('회원정보 업데이트 성공: ', response.data)
    } catch (err) {
      console.log('회원정보 업데이트 에러: ', err)
    }
  }

  const addAccount = async (accountData, userId) => {
    try {
      const response = await apiClient.patch(`/account/${userId}`, accountData)
      console.log('회원정보 추가 성공: ', response.data)
    } catch (err) {
      console.log('회원정보 업데이트 에러: ', err)
    }
  }

  const logIn = logInUsername => {
    localStorage.setItem('userId', logInUsername)
    console.log('로그인 성공: ', logInUsername)
  }

  // bank정보만 불러오게
  const userID = ref(localStorage.getItem('userId') || '')
  // 로그인 시 받아온 userID를 사용하여 필터링

  const bankInfo = computed(() => {
    const bankInfo = accountInfo.value.filter(item => {
      return item.id === userID.value
    })

    return bankInfo
  })

  const $reset = () => {
    accountInfo.value = []
    userID.value = localStorage.getItem('userId') || ''
  }

  return {
    accountInfo,
    fetchAccount,
    bankInfo,
    updateAccount,
    logIn,
    addAccount,
    fetchAccountById,
    $reset,
    userID,
  }
})
