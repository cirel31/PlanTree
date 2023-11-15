import { ChangeEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactModal from 'react-modal'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '@/components/Button/Button.css'
import Button from '@/components/Button/Button'
// import {
//   noticeDetail,
//   groupNoticeList,
//   groupNoticeUpdate,
//   noticeFileCreate,
//   noticeFileDownload,
//   deleteNotice,
// } from '@/apis/communication'
import {
  NewsLetterListG,
  NewsLetter,
  ModifyNewsLetterReq,
  // AddFile,
} from '@/types/NewsLetterType'
import { groupNoticeList } from '@/apis'
// import { v4 as uuidv4 } from 'uuid'

const NewsLetterPage = () => {
  const { groupId } = useParams()
  const MySwal = withReactContent(Swal)
  // const uuid = uuidv4()
  const [isModifying, setIsModifying] = useState<boolean>(false)
  const [inputInformId, setInputInformId] = useState<any>(0)
  const [inputTitle, setInputTitle] = useState<string>('플젝이')
  const [inputContent, setInputContent] = useState<string>('하기 싫어요')
  const [inputFileName, setInputFileName] = useState<string[]>([''])
  const [inputNewsLetters, setInputNewsLetters] = useState<NewsLetterListG>([
    {
      informId: 's;lakf',
      title: '플젝이',
      createdAt: new Date(),
    },
  ])
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [inputWriter, setInputWriter] = useState<string>('')

  const newsListDate = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    return [year, month, day].join('-')
  }

  const modifyNewsLetter = () => {
    console.log('수정하기: ', inputTitle)
    console.log('수정하기: ', inputContent)
    setIsModifying(true)
  }

  const modifyTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setInputTitle(value)
  }

  const modifyContent = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setInputContent(value)
  }

  const downloadFile = (fileName: string) => {
    console.log(fileName)
  }

  const sendNewsLetter = () => {
    // const data: ModifyNewsLetterReq = {
    //   title: inputTitle,
    //   content: inputContent,
    // }
    // groupNoticeUpdate(inputInformId, data)
    console.log(inputTitle)
    console.log(inputContent)

    setIsModifying(false)
  }

  const closeModal = () => {
    setIsModifying(false)
    setModalIsOpen(false)
  }

  const showNews = async (notificationId: any) => {
    setInputInformId(notificationId)
    setModalIsOpen(true)

    // api 연결
    // const news: NewsLetter = noticeDetail(notificationId)

    const news: NewsLetter = {
      title: inputTitle,
      writer: '오주영',
      content: inputContent,
      files: [
        { fileId: '랄랄라라라', fileName: '루루룰루룰' },
        { fileId: '너무', fileName: '힘들어요' },
      ],
    }

    // useState에 때려박자
    setInputTitle(news.title)
    setInputContent(news.content)
    const fileNames: string[] = []
    news.files.map((file) => fileNames.push(file.fileName))
    setInputFileName(fileNames)
    setInputWriter(news.writer)
  }

  useEffect(() => {
    const fetchDataAndShowNews = async () => {
      try {
        // 데이터를 가져와서 inputNewsLetters에 설정
        // const response = await groupNoticeList(groupId)
        // setInputNewsLetters(response.data)

        // isModifying가 true일 때만 showNews 함수 호출
        if (isModifying) {
          showNews(inputInformId)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchDataAndShowNews()
  }, [groupId, isModifying, inputInformId])

  return (
    <>
      <div>가정통신문</div>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {inputNewsLetters.map((news, idx) => (
            <tr key={news.informId}>
              <td>{idx + 1}</td>
              <td>
                <button onClick={() => showNews(news.informId)}>
                  {news.title}
                </button>
                <ReactModal
                  isOpen={modalIsOpen}
                  ariaHideApp={false}
                  onRequestClose={closeModal}
                  style={{
                    overlay: {
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      width: '100%',
                      height: '100vh',
                      zIndex: 10,
                      top: 0,
                      left: 0,
                    },
                    content: {
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '50%',
                      height: '50%',
                      border: '2px solid #000',
                      borderRadius: '10px',
                      overflow: 'auto',
                      background: '#F5F5DC',
                      boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
                    },
                  }}
                >
                  <div>
                    {isModifying ? (
                      <>
                        <div>제목: </div>
                        <input
                          type="text"
                          value={inputTitle}
                          onChange={modifyTitle}
                        />
                        <div>내용: </div>
                        <input
                          type="text"
                          value={inputContent}
                          onChange={modifyContent}
                        />
                        <Button onClick={sendNewsLetter} label="확인" />
                      </>
                    ) : (
                      <>
                        <div>{inputTitle}</div>
                        <div>{inputWriter}</div>
                        <div>{inputContent}</div>
                        <hr />
                        {inputFileName.map((file, index) => (
                          <button onClick={() => downloadFile(file)}>
                            <div key={index}>
                              <div>{file}</div>
                            </div>
                          </button>
                        ))}
                        <Button onClick={modifyNewsLetter} label="수정하기" />
                      </>
                    )}
                  </div>
                </ReactModal>
              </td>
              <td>{newsListDate(news.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default NewsLetterPage
