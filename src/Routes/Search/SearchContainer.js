import React from "react";
import {withRouter} from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { SEARCH } from "./SearchQueries";
import {useQuery} from "react-apollo-hooks";
 


export default withRouter( ({location: {search}}) => {
    const searchKeyword = search.split("?term=")[1];
    // eslint-disable-next-line
    const {data, loading} = useQuery(SEARCH,{
        skip:((searchKeyword===undefined)||(searchKeyword.length ===1 )),
        variables:{
            term: searchKeyword
        }
    });
    return <SearchPresenter searchKeyword={searchKeyword} loading={loading} data={data} />
}
)

