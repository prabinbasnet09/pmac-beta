import ChairControl from '../components/ChairControl';
export default function Updates() {
  return (
    <div className='flex items-center justify-center '>
      <div className='w-3/4 px-2 sm:px-0'>
        <div className={`${'nav-body'}`}>
          <ChairControl />
        </div>
      </div>
    </div>
  );
}
