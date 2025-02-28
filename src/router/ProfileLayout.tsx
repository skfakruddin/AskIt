const ProfileLayout = () => {
    return (
      <div className="flex flex-col h-[calc(100vh-16rem)] sm:h-[calc(100vh-11rem)]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-grow">
          <div className="col-span-1 bg-dcardbg rounded-lg p-4 overflow-y-scroll">
          </div>
  
          <div className="col-span-3 bg-dcardbg rounded-lg p-4 overflow-y-scroll">
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfileLayout;
  