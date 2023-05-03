export default function Results(props) {
  const { activeUser } = props;
  return activeUser.results ? (
    <div className='mt-5 flex-col justify-center bg-white  text-xl w-full p-5 rounded-lg '>
      <div className='text-red text-2xl font-semibold p-4'>
        {activeUser.results[0]}
      </div>
      <div className='text-red text-2xl font-semibold p-4'>
        {activeUser.results[1]}
      </div>
    </div>
  ) : null;
}
