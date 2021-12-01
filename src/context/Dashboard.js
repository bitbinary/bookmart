import React, { createContext, useEffect, useState } from "react";
import { getMonth } from "tools/dates";
import { useFetch } from "use-http";
import moment from "moment";
import * as _ from "lodash";
import { getAuth } from "@firebase/auth";
export const AdminDashboard = createContext();

export function AdminDashboardContext({ children }) {
  const AdminDash = SetAdminDashboardValues();

  return (
    <AdminDashboard.Provider value={AdminDash}>
      {children}
    </AdminDashboard.Provider>
  );
}

function SetAdminDashboardValues() {
  const [genresVisualX, setGenresVisualX] = useState([]);
  const [genresVisualY, setGenresVisualY] = useState([]);
  const [totalNumberOfSales, setTotalNumberOfSales] = useState();
  const [totRevenue, setTotalRevenue] = useState(null);
  const [registrationData, setRegistrationData] = useState([]);
  const [totalRegistrations, setTotalRegistrations] = useState([]);
  const [monthFilter, setMonthFilter] = useState(getMonth());
  const [transactionData, setTransactionData] = useState({
    monthly: {},
    weekly: {},
  });
  const [topSellersData, setTopSellersData] = useState([]);
  const options = {};
  const {
    loading: genresloading,
    error: genreserror,
    data: genresdata,
  } = useFetch("admin/genresummary", options, []);
  const {
    loading: transactionloading,
    error: transactionerror,
    data: transactiondata,
  } = useFetch("admin/transactionsummary", options, []);
  const {
    loading: summaryloading,
    error: summaryerror,
    data: summarydata,
  } = useFetch("admin/gettitlesummary", options, []);
  const {
    loading: userloading,
    error: usererror,
    data: userdata,
  } = useFetch("admin/getuserregistrations", options, []);
  useEffect(() => {
    if (genresdata?.genres) {
      const { x, y } = genreDataGetter(genresdata?.genres);
      setGenresVisualX(x);
      setGenresVisualY(y);
    }
  }, [genresdata]);
  useEffect(() => {
    setTotalNumberOfSales(transactiondata?.sales?.length);
    let { monthly, totalRevenue } = groupbyMonth(transactiondata?.sales);
    let weekly = groupbyWeek(transactiondata?.sales);
    setTotalRevenue(totalRevenue);
    setTransactionData({ monthly, weekly });
  }, [transactiondata]);
  useEffect(() => {
    let monthlyTopSellers = groupbyTitle(summarydata?.topselling);
    setTopSellersData(monthlyTopSellers);
  }, [summarydata]);
  useEffect(() => {
    let registrationData = groupUserData(userdata?.timestamps);
    setTotalRegistrations(userdata?.timestamps.length);
    setRegistrationData(registrationData);
  }, [userdata]);
  return {
    genresloading,
    genreserror,
    genresdata,
    transactionloading,
    transactionerror,
    transactiondata,
    summaryloading,
    summaryerror,
    summarydata,
    genresVisualX,
    genresVisualY,
    monthFilter,
    transactionData,
    topSellersData,
    totalNumberOfSales,
    totRevenue,
    registrationData,
    totalRegistrations,
    userloading,
    usererror,
  };
}

const genreDataGetter = (data) => {
  let x = [];
  let y = [];
  if (data && data.length > 0) {
    data.map((item) => {
      x.push(item.genre);
      y.push(item.count);
    });
  }
  return { x, y };
};

const groupbyMonth = (data) => {
  let grouped_items = _.groupBy(data, (b) => moment(b.timestamp).format("M"));
  let counts = _.map(grouped_items, (monthly) =>
    _.sumBy(monthly, function (o) {
      return o.count;
    })
  );
  let revenues = _.map(grouped_items, (monthly) =>
    _.sumBy(monthly, function (o) {
      return o.totalrevenue;
    })
  );
  let totalRevenue = _.sumBy(revenues, function (o) {
    return o;
  });
  let months = _.map(grouped_items, (obj, month) => {
    return moment()
      .month(Number(month) - 1)
      .format("MMMM");
  });
  return { monthly: { counts, revenues, timeline: months }, totalRevenue };
};
const groupbyWeek = (data) => {
  let grouped_items = _.groupBy(data, (b) => moment(b.timestamp).format("W"));
  let counts = _.map(grouped_items, (weekly) =>
    _.sumBy(weekly, function (o) {
      return o.count;
    })
  );
  let revenues = _.map(grouped_items, (weekly) =>
    _.sumBy(weekly, function (o) {
      return o.totalrevenue;
    })
  );
  let weeks = _.map(grouped_items, (obj, week) => {
    return moment().week(Number(week)).format("MMM/w");
  });
  // => 20
  return { counts, revenues, timeline: weeks };
};
const groupbyTitle = (data) => {
  let grouped_items_timeline = _.groupBy(data, (b) =>
    moment(b.createdat).format("M")
  );
  let grouped_items_timeline_topics = _.map(
    grouped_items_timeline,
    (data, key) => {
      return {
        titles: _.takeRight(
          _.sortBy(
            _.map(
              _.groupBy(data, (b) => b.title),
              (item, key) => {
                return {
                  title: key,
                  count: _.sumBy(item, function (o) {
                    return o.count;
                  }),
                };
              }
            ),
            [
              function (o) {
                return o.count;
              },
            ]
          ),
          10
        ).reverse(),
        month: moment()
          .month(Number(key) - 1)
          .format("MMMM"),
      };
    }
  );
  let monthlyTopSellers = {};
  _.map(grouped_items_timeline_topics, (obj) => {
    monthlyTopSellers[obj.month] = {
      titles: _.map(obj.titles, (book) => book.title),
      counts: _.map(obj.titles, (book) => book.count),
    };
  });
  return monthlyTopSellers;
};

const groupUserData = (data) => {
  let grouped_items_month = _.map(
    _.groupBy(data, (b) => moment(b).format("M")),
    (weekly, key) => {
      return {
        month: key,
        count: weekly.length,
      };
    }
  );
  let grouped_items_week = _.map(
    _.groupBy(data, (b) => moment(b).format("w")),
    (weekly, key) => {
      return {
        week: key,
        count: weekly.length,
      };
    }
  );

  let weeks = _.map(grouped_items_week, (obj, week) => {
    return moment().week(Number(obj.week)).format("MMM/w");
  });
  let weekly = _.map(grouped_items_week, (obj, week) => {
    return obj.count;
  });
  let months = _.map(grouped_items_month, (obj, month) => {
    return moment().month(Number(obj.month)).format("MMMM");
  });
  let monthly = _.map(grouped_items_week, (obj, month) => {
    return obj.count;
  });

  return {
    weekly: { timeline: weeks, count: weekly },
    monthly: { timeline: months, count: monthly },
  };
};
