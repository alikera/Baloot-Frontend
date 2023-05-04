import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/commodities.css";
import "../css/normalize.css";
import Commodity from "./Commodity";
import MyPagination from "../components/Pagination";
import HomeHeader from "./HomeHeader";
import FilterBar from "./FilterBar";
import Footer from "../components/footer";

function Home() {
    const [commodities, setCommodities] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOption, setSearchOption] = useState("name");
    const [availableFlag, setAvailableFlag] = useState(false);
    const [sortBy, setSortBy] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    // TODO: total page
    const [totalPages, setTotalPages] = useState(10);

    useEffect(() => {
        setCommodities([]);
        setTotalPages(1);
        const apiUrl = `http://localhost:8080/api/?search=${searchQuery}&option=${searchOption}&available=${availableFlag}&sort=${sortBy}&page=${pageNumber}`;
        axios.get(apiUrl).then((response) => {
            setCommodities(response.data.commodities);
            setTotalPages(response.data.totalPages);
        });
    }, [sortBy, pageNumber, availableFlag, searchOption, searchQuery]);

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchOption = (event) => {
        setSearchOption(event.target.value);
    };

    const handleAvailableCommodities = (event) => {
        setAvailableFlag(!availableFlag);
    };

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    };

    const handlePageNumber = (event, value) => {
        setPageNumber(value);
    };

    return (
        <>
            <HomeHeader searchOption={searchOption}
                    handleSearchOption={handleSearchOption}
                    searchQuery={searchQuery}
                    handleSearchQueryChange={handleSearchQueryChange}/>
            <main>
                <div className="container">
                    <FilterBar
                        availableFlag={availableFlag}
                        handleAvailableCommodities={handleAvailableCommodities}
                        sortBy={sortBy}
                        handleSortByChange={handleSortByChange}
                    />
                    <div className="container mb-5">
                        <div className="row">
                            {commodities.map((commodity, index) => (
                                <Commodity key={index} commodity={commodity} />
                            ))}
                        </div>
                    </div>

                    <MyPagination totalPages={totalPages} handlePageNumber={handlePageNumber} />
                </div>
            </main>

            <Footer/>
        </>
    );
}

export default Home;