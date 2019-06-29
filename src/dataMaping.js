import { formatDate } from './utils';

/*

  Data[]
    MonthName
    MonthUserProjectModel[]
      UserName
      DayUserProjectReportModels[]
        FullDate
        OfficialHours
        OvertimeHours
        DescritionForOfficial
        DescriptionForOvertime


  NextData[]
    FullDate
    UserName1
      OfficialHours
      OvertimeHours
      DescritionForOfficial
      DescriptionForOvertime
    UserName2
      OfficialHours
      OvertimeHours
      DescritionForOfficial
      DescriptionForOvertime

*/

export const mapDataByProject = data => {

  const NextData = data.Data[0].MonthUserProjectModel[0].DayUserProjectReportModels
    .map(day => ({ date: formatDate(day.FullDate) }));

  const usersList = data.Data[0].MonthUserProjectModel;

  usersList.forEach(user => {
    user.DayUserProjectReportModels.forEach((day, i) => {
      NextData[i][user.UserName] = {
        OfficialHours: day.OfficialHours,
        OvertimeHours: day.OvertimeHours,
        DescritionForOfficial: day.DescritionForOfficial || '',
        DescriptionForOvertime: day.DescriptionForOvertime || '',
      }
    });
  });

  return NextData;
};
