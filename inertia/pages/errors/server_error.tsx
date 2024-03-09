export default function ServerError(props: { error: any }) {
  return (
    <>
      <div className="container">
        <div className="bg-red-100 text-red-600 p-4 rounded-lg mt-4">Server Error</div>

        <span>{props.error.message}</span>
      </div>
    </>
  )
}
