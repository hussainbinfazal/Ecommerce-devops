import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
const NavigationHeader = () => {
  const pathnames = useLocation().pathname.split("/").filter(Boolean);

  const navigate = useNavigate();
  return (
    <div className=" lg:w-6/7 xl:w-6/7 2xl:w-6/7 w-full h-[100px] flex items-center gap-2 py-2 px-2   text-sm">
      <Link to="/" className="text-gray-600 hover:text-blue-500">
        Home
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={name}>
            <MdKeyboardArrowRight className="text-gray-500" />
            {isLast ? (
              <span className="text-gray-900 font-medium capitalize">
                {name}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="text-gray-600 hover:text-blue-500 capitalize"
              >
                {name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default NavigationHeader;
