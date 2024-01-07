declare namespace defs {
  export namespace admin {
    export class PageModules {
      /** id */
      id: number

      /** 数据1 */
      jsonData: string

      /** 数据2 */
      jsonPage: string

      /** 类型 */
      type:
        | 'login'
        | 'meeting'
        | 'meetingApply'
        | 'meetingMeal'
        | 'flow'
        | 'meetingNav'
        | 'meetingBus'
        | 'meetingRegister'
        | 'signIn'
        | 'contact'
        | 'questionnaire'
        | 'schedule'
        | 'seat'
        | 'photo'
        | 'tips'
        | 'weather'
        | 'custom'
        | 'customForm'
        | 'outer'
    }

    export class CreatePageModulesRequest {
      /** 数据1 */
      jsonData: string

      /** 数据2 */
      jsonPage: string

      /** 类型 */
      type:
        | 'login'
        | 'meeting'
        | 'meetingApply'
        | 'meetingMeal'
        | 'flow'
        | 'meetingNav'
        | 'meetingBus'
        | 'meetingRegister'
        | 'signIn'
        | 'contact'
        | 'questionnaire'
        | 'schedule'
        | 'seat'
        | 'photo'
        | 'tips'
        | 'weather'
        | 'custom'
        | 'customForm'
        | 'outer'
    }
    export class UpdatePageModulesRequest {
      /** 数据1 */
      jsonData?: string

      /** 数据2 */
      jsonPage?: string

      /** 类型 */
      type?:
        | 'login'
        | 'meeting'
        | 'meetingApply'
        | 'meetingMeal'
        | 'flow'
        | 'meetingNav'
        | 'meetingBus'
        | 'meetingRegister'
        | 'signIn'
        | 'contact'
        | 'questionnaire'
        | 'schedule'
        | 'seat'
        | 'photo'
        | 'tips'
        | 'weather'
        | 'custom'
        | 'customForm'
        | 'outer'
    }
  }
}
