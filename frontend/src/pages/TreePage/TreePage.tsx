import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { BarChart, DoughnutChart, PieChart, Tree } from '@/components'
import './TreePage.scss'
import { RootState } from '@/stores/store.ts'
import { getTreeDetailData } from '@/stores/features/forestSlice.ts'

const TreePage = () => {
  const dispatch = useDispatch()
  const [totalP, setTotalP] = useState<null | number>(null)
  const detailData = useSelector(
    (state: RootState) => state.forest.detailData,
  ) ?? {
    treeName: '나의 라임오렌지나무5',
    startedAt: '2023-11-06',
    endedAt: '2023-11-12',
    branches: [
      {
        branchId: '2e96a422-0a32-4d67-9e63-2a3c82568d85',
        branchName: '영어 5',
        buds: [],
        totalBudCount: 0,
        completedBudCount: 0,
      },
      {
        branchId: '4f68b02b-0ca7-4c5a-8192-660f20b25132',
        branchName: '영어 2',
        buds: [
          {
            budId: '2e96a422-0a32-4d67-9e63-2a3c82568d85',
            budName: '영어 문제 풀기5',
            complete: true,
          },
        ],
        totalBudCount: 1,
        completedBudCount: 1,
      },
      {
        branchId: '7b5421ca-4d89-4d1d-80b9-6533aaacdd3a',
        branchName: '영어 1',
        buds: [
          {
            budId: '4f68b02b-0ca7-4c5a-8192-660f20b25132',
            budName: '영어 문제 풀기2',
            complete: true,
          },
          {
            budId: '7b5421ca-4d89-4d1d-80b9-6533aaacdd3a',
            budName: '영어 문제 풀기1',
            complete: true,
          },
          {
            budId: 'b7d74ef2-9a20-44ea-9527-4b3c9b3bd8a6',
            budName: '영어 문제 풀기3',
            complete: false,
          },
          {
            budId: 'd3e9c11c-d52c-4b77-8fc5-7e1e0839f90c',
            budName: '영어 문제 풀기4',
            complete: false,
          },
        ],
        totalBudCount: 4,
        completedBudCount: 2,
      },
      {
        branchId: 'b7d74ef2-9a20-44ea-9527-4b3c9b3bd8a6',
        branchName: '영어 3',
        buds: [],
        totalBudCount: 0,
        completedBudCount: 0,
      },
      {
        branchId: 'd3e9c11c-d52c-4b77-8fc5-7e1e0839f90c',
        branchName: '영어 4',
        buds: [],
        totalBudCount: 0,
        completedBudCount: 0,
      },
    ],
  }
  const { id } = useParams()
  useEffect(() => {
    console.log(id, detailData)
    dispatch(getTreeDetailData())
  }, [id])

  useEffect(() => {
    let newSum = 0
    let newFin = 0

    detailData.branches.forEach((branch) => {
      newSum += branch.totalBudCount
      newFin += branch.completedBudCount
    })
    console.log(newFin, newSum)
    if (newSum > 0) {
      setTotalP((newFin / newSum) * 100)
    } else {
      setTotalP(0)
    }
  }, [detailData])

  // const detailProcess = detailData.branches.map((branch) => ({
  //   ...branch,
  //   processRatio: branch.totalBudCount
  //     ? branch.completedBudCount / branch.totalBudCount
  //     : 0,
  // }))

  return (
    <div className="tree-page">
      <div className="tree-page-title">
        {detailData.startedAt} ~ {detailData.endedAt}
      </div>
      <div className="tree-page-tree">
        <Tree degree={30} />
      </div>
      <div className="tree-page-title">통계</div>
      <div className="tree-page-chart-container">
        <div className="tree-page-chart">
          전체 달성도
          <DoughnutChart
            centerText={
              totalP === null ? 'Loading...' : `${totalP.toFixed(2)}%`
            }
            chartData={{
              data: totalP === null ? [100, 0] : [totalP, 100 - totalP],
            }}
          />
        </div>
        <div className="tree-page-chart">
          가지 분포
          <PieChart />
        </div>
        <div className="tree-page-chart">
          가?지 요?일 별 달성도 차트
          <BarChart />
        </div>
      </div>
      <div className="tree-page-title">회고회고</div>
      <div>회고 맵돌리는 구간</div>
    </div>
  )
}

export default TreePage
