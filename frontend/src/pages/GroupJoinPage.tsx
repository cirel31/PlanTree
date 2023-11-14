import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { groupJoinRequest } from '@/apis'
// import axios from 'axios';

const GroupJoinPage: React.FC<any> = () => {
  const { groupId } = useParams()

  const [studentsData, setStudentsData] = useState<any>(null)
  const [requestData, setRequestData] = useState<any>(null)

  // 그룹 가입 신청
  const handleGroupJoin = async () => {
    try {
      const response = await groupJoinRequest(groupId)
      console.log('그룹가입신청 응답:', response)
    } catch (error) {
      console.error('그룹가입신청 Error:', error)
    }
    // console.log('이거', response)
  }

  // const navi = useNavigate()
  useEffect(() => {
    handleGroupJoin()
    // .then(() => {
    //   navi('/studentGroup')
    // })
  }, [])

  return (
    <div>
      <div>그룹 가입이 신청되었습니다.</div>
      <Link to="/main">
        <div>메인으로 돌아가기</div>
      </Link>
    </div>
  )
}

export default GroupJoinPage
