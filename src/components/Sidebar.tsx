import { motion } from "framer-motion";
import { Link, useLocation } from "react-router";
import { useProfile } from "../hooks/useProfile";

function Sidebar({ }: { isOpen: boolean }) {
  const location = useLocation();
  const {archive} = useProfile();

  return (
    <div className="md:block text-white scrollbar-hide w-full">
      <ul className="space-y-6">
        {/* Created Rooms Section */}
        {archive.createdRooms.count > 0 && (
          <li className="relative">
            <div className="sticky top-0 p-2 z-10  backdrop-blur-md rounded-t-lg">
              <div className="text-lg font-bold">Created Rooms</div>
            </div>
            <ul className="mt-2 space-y-2 px-2">
              {archive.createdRooms.rooms.map((room) => (
                <motion.li key={room.joinCode} className="">
                  <Link
                    to={`/profile/${room.joinCode}`}
                    className={`flex px-2 rounded-md transition-all w-full ${
                      location.pathname === `/profile/${room.joinCode}` ? "bg-[#35353580] p-2 w-full" : ""
                    }`}
                  >
                    {room.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </li>
        )}

        {/* Joined Rooms Section */}
        {archive.joinedRooms.count > 0 && (
          <li className="relative">
            <div className="sticky top-0 p-2 z-10  backdrop-blur-md rounded-t-lg">
              <div className="text-lg font-bold">Joined Rooms</div>
            </div>
            <ul className="mt-2 space-y-2 px-2">
              {archive.joinedRooms.rooms.map((room) => (
                <motion.li key={room.joinCode}>
                  <Link
                    to={`/profile/${room.joinCode}`}
                    className={`block px-2 rounded-md transition-all ${
                      location.pathname === `/profile/${room.joinCode}` ? "bg-[#35353580] p-2" : ""
                    }`}
                  >
                    {room.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
