import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CANCEL_SCHEDULE, GET_SCHEDULE, PATIENT_REGISTRATION, useApi } from '../../../api'
import Modal from '../../../components/Modal'
import Popper from '../../../components/Popper'
import { SCHEDULE_STATUS } from '../../../constants'
import { useAppSelector } from '../../../hooks/store'
import { dateFormat, hourFormat } from '../../../utils'

type keys = keyof typeof SCHEDULE_STATUS
type Props = {
  option: keys
}
export default function AppointmentManager({ option }: Props) {
  const [data, setData] = useState<Appointment[]>([])
  const { user } = useAppSelector((state) => state.auth)
  const role = user?.role as Role
  const navigate = useNavigate()
  useEffect(() => {
    getData()
  }, [])

  const columns = useMemo<MRT_ColumnDef<Appointment>[]>(
    () => [
      {
        header: 'Thời gian',
        accessorFn: (originalRow) => {
          const date = new Date(originalRow?.date || '').getTime()
          return hourFormat(originalRow.from + date) + ' - ' + dateFormat(originalRow.to + date)
        }
      },
      {
        id: 'room',
        header: 'Phòng khám',
        accessorFn: (originalRow) => originalRow.room || '-'
      },
      // {
      //   id: 'room-online',
      //   header: 'Phòng online',
      //   accessorFn({ code }) {
      //     return (
      //       <Link to={`/online-appointment/${code}`}>
      //         <b style={{ color: 'var(--color-default)' }}>{code}</b>
      //       </Link>
      //     )
      //   },
      //   size: 1
      // },
      {
        header: role === 'doctor' ? 'Bệnh nhân' : 'Bác sĩ',
        accessorFn: (originalRow) =>
          (role === 'doctor' ? originalRow.user?.fullName || originalRow?.name : originalRow.doctor?.fullName) || '-'
      },
      {
        size: 1,
        header: 'Ghi chú',
        id: 'note',
        accessorFn: (originalRow) => (
          <Popper title='Ghi chú' content={originalRow.note}>
            <button type='button' className='btn btn-lg'>
              <i className='bi bi-stickies-fill'></i>
            </button>
          </Popper>
        )
      },
      {
        header: 'Tài khoản',
        id: 'account',
        accessorFn: (originalRow) => (originalRow.user ? 'Người dùng' : 'Khách')
      },
      {
        header: 'Điện thoại',
        accessorFn: (originalRow) => (role === 'doctor' ? originalRow.phone : originalRow.doctor?.phone)
      },
      {
        header: 'Email',
        accessorFn: (originalRow) => (role === 'doctor' ? originalRow.user?.email : originalRow.doctor?.email) || '-'
      },
      {
        header: 'Hủy',
        accessorKey: 'cancel',
        accessorFn: (originalRow) => (originalRow?.updatedAt ? dateFormat(originalRow.updatedAt) : '')
      },
      {
        header: 'Tạo',
        accessorFn: (originalRow) => dateFormat(originalRow.createdAt)
      },
      {
        header: 'Lý do',
        accessorKey: 'message',
        size: 1
      },
      {
        id: 'actions',
        header: 'Thao tác',
        accessorFn({ _id }) {
          return (
            <div className='group-btn'>
              <Modal
                id={_id}
                name='accept'
                onSubmit={() => handleAccept(_id)}
                title='Xác nhận lịch khám bệnh'
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
                onSubmit={(data) =>
                  role === 'doctor' ? handleDeny(_id, String(data)) : handleCancel(_id, String(data))
                }
                title='Hủy lịch khám bệnh'
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
            </div>
          )
        }
      },
      {
        id: 'success',
        header: 'Thao tác',
        accessorFn({ _id }) {
          return (
            <div className='group-btn'>
              <Modal
                id={_id}
                name='accept'
                onSubmit={() => handleSuccess(_id)}
                title={'Xác nhận đã khám'}
                description='Đã hoàn tất khám cho bệnh nhân này'
                button={
                  <button className='btn btn-success'>
                    <i className='bi bi-check-circle'></i>
                  </button>
                }
              />
            </div>
          )
        }
      }
    ],
    []
  )

  const getData = async () => {
    await useApi
      .get(PATIENT_REGISTRATION + '?option=' + SCHEDULE_STATUS[option])
      .then((res) => {
        const data = res.data as Data<Appointment>
        setData(data.data)
      })
      .catch()
  }

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

  const handleDeny = async (id: string, message: string) => {
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

  const handleCancel = async (id: string, message: string) => {
    await useApi
      .patch(CANCEL_SCHEDULE.replace(':id', id), {
        message
      })
      .then(() => {
        getData()
        toast.success('Hủy lịch khám thành công')
      })
  }

  const handleSuccess = async (id: string) => {
    await useApi
      .patch(GET_SCHEDULE.replace(':id', id), {
        status: SCHEDULE_STATUS.COMPLETED
      })
      .then(() => {
        getData()
        toast.success('Xác nhận thành công')
      })
    navigate('/dashboard/medical-record/create/' + id)
  }

  return (
    <section className='section'>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableFilters={false}
        enableRowNumbers
        state={{
          columnVisibility: {
            actions: option === 'PENDING' && role === 'appointment staff',
            message: option === 'CANCEL',
            success: option === 'PROGRESS' && role === 'doctor',
            'room-online': option !== 'CANCEL',
            room: option !== 'CANCEL',
            cancel: option == 'CANCEL',
            account: role !== 'user',
            note: role !== 'user'
          }
        }}
      />
    </section>
  )
}
