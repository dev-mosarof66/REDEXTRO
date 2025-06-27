import { useContext, useEffect, useState } from "react";
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Context from "../store/store";
import Header from "../components/Home/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loader from "../components/Loader";
import axiosInstance from '../axios/axios'
import Ongoing from "../components/Home/Ongoing";
import Plans from "../components/Home/Plans";
import colors from '../constants/colors'
import PlanModal from "../components/Home/PlanModal";



const Home = () => {
  const { plans, setPlans, user } = useContext(Context || []);
  const [loading, setLoading] = useState(false)
  const [todaysPlan, setTodaysPlan] = useState(null)
  const [completedPlan, setCompletedPlan] = useState(null)
  const [upcomingPlan, setUpcomingPlan] = useState(null)


  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true)
      await axiosInstance.get('/user/plans').then((res) => {
        setPlans(res?.data?.plans)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        setLoading(false)
      })
    }
    fetchPlans()
  }, [])


  //filter all plans 

  useEffect(() => {
    setLoading(true)
    const todaysPlan = plans?.filter((plan) => plan?.status === 'TODAY')
    const CompletedPlan = plans?.filter((plan) => plan?.status === 'PAST')
    const UpcomingPlan = plans?.filter((plan) => plan?.status === 'FUTURE')
    // console.log(todaysPlan)
    setTodaysPlan(todaysPlan)
    setCompletedPlan(CompletedPlan)
    setUpcomingPlan(UpcomingPlan)
    setLoading(false)
  }, [plans])




  //loader 

  if (loading) {
    return <Loader />
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.five,

      }}

      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: wp(5)
        }}
      >
        <StatusBar barStyle="dark-content" backgroundColor="rgb(0, 191, 255)" />
        <Header setLoading={setLoading} user={user} />
        <Ongoing todaysPlans={todaysPlan} setTodaysPlan={setTodaysPlan} />
        <Plans upcomingPlans={upcomingPlan} completedPlan={completedPlan} todaysPlan={todaysPlan} />
        <PlanModal />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;
