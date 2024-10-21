import { Order } from "@/type";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../components/ui/table";
import { Button } from "./ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "./ui/pagination"; // Ensure you have the correct import paths
import { useState } from "react";
import { useNavigate } from "react-router-dom";


type Props = {
    orders: Order[];
}

const OrderList = ({ orders }: Props) => {
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of orders to display per page

    // Calculate total pages
    const totalPages = Math.ceil(orders.length / itemsPerPage);

    // Get current orders to display
    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Handle pagination change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
 const navigate = useNavigate()
 const handleView =(orderid:string)=>{
 navigate(`/order/${orderid}`)
}
    return (
        <div className="max-w-6xl mx-auto md:mt-10 mt-0 px-4">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Orders</h2>
            {orders.length === 0 ? (
                <p className="text-lg text-red-500">No orders found</p>
            ) : (
                <>
                    <Table className="mb-4 h-max-screen h-[38vh]">
                        <TableHeader>
                            <TableRow>
                                <TableCell className="hidden md:table-cell">Order ID</TableCell>
                                <TableCell className="">Total Amount</TableCell>
                                <TableCell className="hidden md:table-cell">Estimated Delivery Time</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>View</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentOrders.map(order => (
                                <TableRow key={order._id}>
                                    <TableCell className="hidden md:table-cell">{order._id}</TableCell>
                                    <TableCell className="">₹{order.totalAmount}</TableCell>
                                    <TableCell className="hidden md:table-cell">{order.restaurant?.estimatedTime || "N/A"} min</TableCell>
                                    <TableCell>{order.status || "Confirmed"}</TableCell>
                                    <TableCell><Button className=" text-black hover:text-green-600" onClick={() =>handleView(order._id)} variant="ghost">View</Button></TableCell>
                                    <TableCell><Button className=" text-black hover:text-red-600 " variant="ghost">Delete</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                           {currentPage>1 &&
                            <PaginationPrevious
                                    href="#"
                                    onClick={() => { if (currentPage > 1) handlePageChange(currentPage - 1); }}
                                />}
                            </PaginationItem>

                            {Array.from({ length: totalPages }, (_, index) => (
                                <PaginationItem key={index + 1}>
                                    <PaginationLink
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(index + 1);
                                        }}
                                        className={currentPage === index + 1 ? "active" : ""}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            {totalPages > 5 && <PaginationItem><PaginationEllipsis /></PaginationItem>}

                            <PaginationItem>
                            {currentPage !== totalPages &&
                            <PaginationNext         
                                   href="#"
                                    onClick={() => { if (currentPage > 1) handlePageChange(currentPage - 1); }}
                                />}
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </>
            )}
        </div>
    );
}

export default OrderList;
