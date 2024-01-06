import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  /*AiOutlineDashboard,*/
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
  AiFillPlusSquare,
  AiFillSetting,


} from "react-icons/ai";
import { RiCouponLine } from "react-icons/ri";
/*import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";*/
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ImBlog, ImMan } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList, FaRocketchat } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { MdFace3, MdOutlineFace2, MdFace4, MdOutlineFace3 } from "react-icons/md";
import { BiBookOpen, BiBookBookmark, BiCategoryAlt, BiCalendarEvent, BiSolidDashboard, BiEdit } from "react-icons/bi";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const getUserfromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  return (
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">SS</span>
            <span className="lg-logo">Sky Salon</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <BiSolidDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Customers",
            },
            {
              key: "employee",
              icon: <ImMan className="fs-4" />,
              label: "Employee",
            },
            {
              key: "Catalog",
              icon: <BiBookBookmark className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "list-product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Product List",
                },
                {
                  key: "product",
                  icon: <AiFillPlusSquare className="fs-4" />,
                  label: "Add Product",
                },



              ],
            },

            //     {
            //       key: "category",
            //       icon: <BiCategoryAlt className="fs-4" />,
            //       label: "Category",
            //       children:[

            //     {
            //       key: "list-category",
            //       icon: <BiCategoryAlt className="fs-4" />,
            //       label: "Category List",
            //     },
            //   ],
            // },

            // {
            //   key: "price-book",
            //   icon: <BiBookOpen className="fs-4" />,
            //   label: "Price Book",
            // },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Orders",
            },
            {
              key: "chat",
              icon: <FaRocketchat className="fs-4" />,
              label: "Chat",
            },
            // {
            //   key: "calen",
            //   icon: <BiCalendarEvent className="fs-4" />,
            //   label: "Calen",
            // },

            {
              key: "appointment",
              icon: <BiCalendarEvent className="fs-4" />,
              label: "Appointment",
              children: [
                {
                  key: "customer-appointment",
                  icon: <AiOutlineUser className="fs-4" />,
                  label: "Customer Appointment",
                },
                {
                  key: "add-appointment",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Appointment",
                },
                {
                  key: "add-slot",
                  icon: <RiCouponLine className="fs-4" />,
                  label: "Add Slots",
                },
              ],
            },
            {
              key: "marketing",
              icon: <RiCouponLine className="fs-4" />,
              label: "Marketing",
              children: [
                {
                  key: "offer",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Offer",
                },
                {
                  key: "Offer-list",
                  icon: <RiCouponLine className="fs-4" />,
                  label: "Offer List",
                },
              ],
            },


            {
              key: "services",
              icon: <AiFillSetting className="fs-4" />,
              label: "Services",
              children: [
                {
                  key: "add-haircut",
                  icon: <MdOutlineFace2 className="fs-4" />,
                  label: "Haircut",
                },
                {
                  key: "facial",
                  icon: <MdFace4 className="fs-4" />,
                  label: "Facial",
                },
                {
                  key: "makeup",
                  icon: <MdFace3 className="fs-4" />,
                  label: "Makeup",
                },
                {
                  key: "bridal",
                  icon: <MdOutlineFace3 className="fs-4" />,
                  label: "Bridal",
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuFoldOutlined : MenuUnfoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            {/* <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-danger rounded-circle p-1 position-absolute ">
                3
              </span>
            </div> */}

            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  width={34}
                  height={34}
                  src="https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt=""
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">{getUserfromLocalStorage ? getUserfromLocalStorage.data.name : "None"}</h5>
                <p className="mb-0">{getUserfromLocalStorage ? getUserfromLocalStorage.data.email : "None"}</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Signout
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >

          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;