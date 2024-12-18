import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table'
import { useLayoutEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { GET_SCHEDULE, NOT_YET_SCHEDULED, useApi } from '../../../api'
import Modal from '../../../components/Modal'
import Popper from '../../../components/Popper'
import { SCHEDULE_STATUS } from '../../../constants'
import { useAppSelector } from '../../../hooks/store'
import { dateFormat, hourFormat } from '../../../utils'

export default function NotYetScheduled() {
  const [data, setData] = useState<Appointment[]>([])
  const role = useAppSelector((state) => state.auth.user?.role) as Role

  useLayoutEffect(() => {
    getData()
  }, [])

  const handleAccept = async (id: string) => {
    await useApi
      .patch(GET_SCHEDULE.replace(':id', id), {
        status: SCHEDULE_STATUS.PROGRESS
      })
      .then(() => {
        getData()
        toast.success('Xác nhận lịch khám thành công')
      })
  }

  const handleCancel = async (id: string, message: string) => {
    await useApi
      .patch(GET_SCHEDULE.replace(':id', id), {
        status: SCHEDULE_STATUS.CANCEL,
        message
      })
      .then(() => {
        getData()
        toast.success('Hủy lịch khám thành công')
      })
  }

  const columns = useMemo<MRT_ColumnDef<Appointment>[]>(
    () => [
      {
        header: 'Bệnh nhân',
        accessorFn: (originalRow) => originalRow?.user?.fullName || originalRow?.name
      },
      {
        header: 'Điện thoại',
        accessorFn: (originalRow) => originalRow?.phone || originalRow?.user?.phone
      },
      {
        header: 'Tài khoản',
        id: 'account',
        accessorFn: (originalRow) => (originalRow.user ? 'Người dùng' : 'Khách')
      },
      {
        maxSize: 1,
        header: 'Ghi chú',
        accessorFn: (originalRow) => (
          <Popper title='Ghi chú' content={originalRow.note}>
            <button type='button' className='btn btn-lg text-primary'>
              <i className='bi bi-journal-plus'></i>
            </button>
          </Popper>
        )
      },
      {
        maxSize: 1,
        header: 'Bệnh án',
        accessorFn: (originalRow) => (
          <button type='button' className='btn btn-lg'>
            <i className='bi bi-file-earmark-medical'></i>
          </button>
        )
      },
      {
        header: 'Tạo lúc',
        accessorFn: (originalRow) => dateFormat(originalRow.createdAt)
      },
      {
        header: 'Thời gian khám',
        // accessorFn: (originalRow) => hourFormat(originalRow.from) + ' - ' + dateFormat(originalRow.to)
        accessorFn: (originalRow) => {
          const date = new Date(originalRow?.date || '').getTime()
          return hourFormat(originalRow.from + date) + ' - ' + dateFormat(originalRow.to + date)
        }
      },
      {
        id: 'room',
        header: 'Phòng',
        // accessorFn({ code }) {
        //   return (
        //     <Link to={`/online-appointment/${code}`}>
        //       <b style={{ color: 'var(--color-default)' }}>{code}</b>
        //     </Link>
        //   )
        // },
        accessorFn: (originalRow) => originalRow.room,
        size: 1
      },
      {
        id: 'doctor',
        header: 'Bác sĩ',
        accessorFn: (originalRow) => originalRow?.doctor?.fullName,
        size: 1
      },
      {
        id: 'success',
        header: 'Hành động',
        accessorFn({ _id, date }) {
          const now = new Date()
          const toDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
          if (new Date(date!).getTime() < toDate.getTime()) return <span>Quá hạn</span>
          return (
            <div className='group-btn'>
              <Modal
                id={_id}
                name='accept'
                onSubmit={() => handleAccept(_id)}
                title='Xác nhận'
                description='Xác nhận lịch khám này'
                button={
                  <button className='btn btn-success'>
                    <i className='bi bi-check-circle'></i>
                  </button>
                }
              />

              <Modal
                id={_id}
                name='deny'
                onSubmit={(data) => role === 'appointment staff' && handleCancel(_id, String(data))}
                title='Hủy'
                description='Xác nhận hủy lịch khám này và bạn không thể khôi phục như ban đầu?'
                button={
                  <button className='btn btn-danger'>
                    <i className='bi bi-x-circle'></i>
                  </button>
                }
                optional={{
                  input: {
                    className: 'form-control',
                    placeholder: 'Lý do hủy'
                  }
                }}
              />
              {/* <Modal
                id={_id}
                name='accept'
                onSubmit={(doctorId: any) => handleSuccess(_id, doctorId)}
                title={'Sắp xếp bác sĩ cho bệnh nhân'}
                description='Bác sĩ'
                button={
                  <button className='btn btn-success'>
                    <i className='bi bi-person-plus-fill'></i>
                  </button>
                }
                optional={{
                  select: {
                    options: doctors.map((d: any) => ({
                      name: d.fullName,
                      value: d._id
                    })),
                    attributes: {
                      defaultValue: doctors?.[0]._id
                    }
                  }
                }}
              /> */}
            </div>
          )
        }
      }
    ],
    []
  )

  const getData = async () => {
    await useApi
      .get(NOT_YET_SCHEDULED)
      .then((res) => {
        const data = res.data as Data<Appointment>
        setData(data.data)
      })
      .catch()

    // await useApi
    //   .get(DOCTOR_LIST)
    //   .then((res) => {
    //     const data = res.data as Data<Doctor>
    //     setDoctors(data.data)
    //   })
    //   .catch()
  }

  return (
    <section className='section'>
      <MaterialReactTable columns={columns} data={data} enableFilters={false} enableRowNumbers state={{}} />
    </section>
  )
}
