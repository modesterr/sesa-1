import React, { useRef } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

function Activate_Deactivate() {
     const dialogRef = useRef<HTMLDialogElement | null>(null)


    const postDeactivate = () => {
        return axiosInstance({
            url: '/security-company/deactivate_activate',
            method: 'post',
            data: { id: company_id },
        })
    }

        const { mutate: deactivate_mutation, isLoading: deactivate_loading } =
        useMutation(postDeactivate, {
            onSuccess: (res) => {
                toast('Company Deactivated successfully', {
                    type: 'success',
                    className: 'bg-green-100 text-green-600 text-[1.4rem]',
                })
            },
            onError: (err: any) => {
                toast('Company Failed to ', {
                    type: 'success',
                    className: 'bg-green-100 text-green-600 text-[1.4rem]',
                })
                return setResponseMessage({
                    className: 'text-red-600',
                    displayMessage: err?.response?.data.message,
                })
            },

            onSettled: () => {
                return handleClose()
            },
        })

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleOpen = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const confirmDeactivation = () => {
        return deactivate_mutation()
    }

  return (
      <>
          <dialog className='dialog' ref={dialogRef}>
              <section className='grid place-content-center w-full h-[100vh]'>
                  <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8 text-[1.6rem]'>
                      <img src='/icons/admins/modalWarning.svg' alt='' />

                      <p>
                          Are you sure you want to deactivate this security
                          company?
                      </p>

                      <div className='flex w-full justify-center gap-8'>
                          <button
                              className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                              onClick={() => handleClose()}
                          >
                              Cancel
                          </button>

                          <button
                              className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem] capitalize'
                              onClick={confirmDeactivation}
                          >
                              {deactivate_loading ? 'Loading...' : 'deactivate'}
                          </button>
                      </div>
                  </div>
              </section>
          </dialog>

          {get_response?.data.status ? (
              <button
                  className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                  onClick={() => handleOpen()}
              >
                  <img src='/icons/admins/delete.svg' alt='' />
                  <span className='text-red-600 text-[1.4rem] font-semibold'>
                      Deactivate
                  </span>
              </button>
          ) : (
              <button
                  className='border border-green-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                  onClick={() => handleOpen()}
              >
                  <span className='text-green-600 text-[1.4rem] font-semibold capitalize'>
                      Activate
                  </span>
              </button>
          )}
      </>
  )
}

export default Activate_Deactivate