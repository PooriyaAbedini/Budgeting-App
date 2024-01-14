import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'

const itemsAdapter = createEntityAdapter({
  selectId: item => item._id || item.id || null
});

const initialState = itemsAdapter.getInitialState({
  state: 'idel',
  error: null,
});

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Items endpoints
    getUserItems: builder.query({
      query: () => 'api/items',
      transformResponse: responseData => {
        return itemsAdapter.setAll(initialState, responseData)
      },
      providesTags: (result, err, arg) => [
        { type: 'Item', id: 'List' }
      ],
    }),
    getItemGroups: builder.query({
      query: () => 'api/items/groups',
      transformResponse: responseData => {
        return itemsAdapter.addMany(initialState, responseData)
      },
      providesTags: (result, err, arg) => [
        { type: 'Group', id:'groupList' }
      ]
    }),
    addItem: builder.mutation({
      query: ({ title, alocatedBudget, group }) => ({
        url: 'api/items/',
        method: 'POST',
        body: { 
          title,
          alocatedBudget,
          group
        },
      }),
      invalidatesTags: (result, err, arg) => [
        { type: 'Item', id: arg.id }
      ]
    }),
    addGroup: builder.mutation({
      query: groupName => ({
        url: `api/items/groups/`,
        method: 'POST',
        body: {
          groupName
        }
      }),
      invalidatesTags: (result, err, arg) => [
        { type: 'Group', id: arg.id }
      ]
    }),
    updateItem: builder.mutation({
      query: initialItem => ({
        url: `api/items/${initialItem.id}`,
        method: 'PUT',
        body: {
          initialItem
        }
      }),
      invalidatesTags: (result, err, arg) => [
        { type: 'Item', id: arg.id }
      ]
    }),
    updateItemExpenses: builder.mutation({
      query: ({itemId, newExpense}) => ({
        url: `api/items/expenses/${itemId}`,
        method: 'PATCH',
        body: {
          newExpense 
        }
      }),
      invalidatesTags: (result, err, arg) => [
        { type: 'Item', id: arg.id }
      ]
    }),
    deleteItem: builder.mutation({
      query: itemId => ({
        url: `api/items/${itemId}`,
        method: 'DELETE',
        body: { itemId }
      }),
      invalidatesTags: (result, err, arg) => [
        { type: 'Item', id: arg.id }
      ]
    }),
    deleteGroup: builder.mutation({
      query: groupName => ({
        url: `api/items/groups/${groupName}`,
        method: 'DELETE',
        body: {}
      }),
      invalidatesTags: (result, err, arg) => [
        {type: 'Group', id: arg.id}
      ]
    }),
    deleteAllItems: builder.mutation({
      query: () => ({
        url: 'api/items',
        method: 'DELETE',
        body: {}
      })
    }),
    //Users endpoints
    getBudget: builder.query({
      query: () => 'api/users/budget',
      transformErrorResponse: responseData => {
        return itemsAdapter.setAll(initialState, responseData)
      },
      providesTags: (result, err, arg) => [
        { type: 'Budget', id: 'BudgetList' }
      ]
    }),
    updateBudget: builder.mutation({
      query: budget => ({
        url: `api/users/budget`,
        method: 'PATCH',
        body: {
          budget
        }
      }),
      invalidatesTags: (result, err, arg) => [
        { type: 'Budget', id: arg.id }
      ]
    }),
    getDueDate: builder.query({
      query: () => 'api/users/budgetDueDate',
      transformResponse: responseData => {
        return itemsAdapter.setOne(initialState, responseData)
      },
      providesTags: (result, err, arg) => [
        { type: 'DueDate', id: 'DueDateData'}
      ]
    }),
    updateDueDate: builder.mutation({
      query: dueDate => ({
        url: `api/users/budgetDueDate/${dueDate}`,
        method: 'PATCH',
        body: {}
      }),
      invalidatesTags: (result, err, arg) => [
        { type: 'DueDate', id: arg.id}
      ],
    }),
    //Expenses Endpoints:
    getExpenses: builder.query({
      query: () => `api/expenses`,
      transformResponse: responseData => {
        return (itemsAdapter.setAll(initialState, responseData))
      },
      providesTags: (result, err, arg) => [
        { type: 'Expense', id: 'expenseList'}
      ]
    }),
    setExpense: builder.mutation({
      query: ({ title, group, expense, monetaryUnit }) => ({
        url: 'api/expenses',
        method: 'POST',
        body: {
          title,
          group,
          expense,
          monetaryUnit
        }
      }),
      invalidatesTags: (result, err, arg) => [
        { type: 'Expense', id: arg.id}
      ]
    }),
    deleteAllExpenses: builder.mutation({
      query: () => ({
        url: 'api/expenses',
        method: 'DELETE',
        body: {}
      }),
      invalidatesTags: (result, err, arg) => [
        { type: 'Expense', id: arg.id}
      ]
    }),
    //CHART DATA ENDPOINTS
    getChartData: builder.query({
      query: () => 'api/chartdata/userData',
      transformErrorResponse: responseData => {
        return itemsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, err, arg) => [
        {type: 'ChartData', id: 'dataList'}
      ]
    }),
    setChartData: builder.mutation({
      query: ({ expense, monthBudget, date }) => ({
        url: 'api/chartdata',
        method: 'POST',
        body: {
          expense,
          monthBudget,
          date
        }
      }),
      invalidatesTags: (result, err, arg) => [
        { type: 'ChartData', id: arg.id }
      ]
    }),
    setMonthDaysRawData: builder.mutation({
      query: () => ({
        url: 'api/chartdata/userData/monthlyRawData',
        method: 'POST',
        body: {}
      })
    }),
    setAnualRawData: builder.mutation({
      query: () => ({
        url: 'api/chartdata/userData/anualRawData',
        method: 'POST',
        body: {}
      })
    }),
    deleteAllChartData: builder.mutation({
      query: () => ({
        url: 'api/chartdata',
        method: 'DELETE',
        body: {}
      }),
      invalidatesTags: (result, err, arg) => [
        { type: 'ChartData', id: arg.id }
      ]
    }),
    deleteChartData: builder.mutation({
      query: ({ id }) => ({
        url: `api/chartdata/:${id}`,
        method: 'DELETE',
        body: {}
      }),
      invalidatesTags: (result, err, arg) => [
        { type: 'ChartData', id: arg.id }
      ]
    })
  })
})

export const {
    useGetUserItemsQuery,
    useGetItemGroupsQuery,
    useDeleteAllItemsMutation,
    useDeleteItemMutation,
    useDeleteGroupMutation,
    useAddItemMutation,
    useAddGroupMutation,
    useUpdateItemExpensesMutation,
    useUpdateItemMutation,
    useGetBudgetQuery,
    useUpdateBudgetMutation,
    useGetDueDateQuery,
    useUpdateDueDateMutation,
    useGetExpensesQuery,
    useSetExpenseMutation,
    useDeleteAllExpensesMutation,
    useGetChartDataQuery,
    useSetChartDataMutation,
    useDeleteAllChartDataMutation,
    useDeleteChartDataMutation,
    useSetMonthDaysRawDataMutation,
    useSetAnualRawDataMutation,
} = extendedApiSlice;

//Memoized selector for items 
export const selectItemsResult = extendedApiSlice.endpoints.getUserItems.select();
export const selectItemsData = createSelector(
    selectItemsResult, 
    itemResults => itemResults.data 
)

//Memoized selector for groups
export const selectGroupsResult = extendedApiSlice.endpoints.getItemGroups.select();
export const selectGroupsData = createSelector(
    selectGroupsResult,
    groupResults => groupResults.data
)
//Memoized selector for budget
export const selectBudgetResult = extendedApiSlice.endpoints.getBudget.select();
export const selectBudgetData = createSelector(
    selectBudgetResult,
    budgetResults => budgetResults.data
)

//Memoized selector for expenses
export const selectExpensesResult = extendedApiSlice.endpoints.getExpenses.select();
export const selectExpensesData = createSelector(
    selectExpensesResult,
    expensesResult => expensesResult.data
)

//Memoized selector for chart data
export const selectChartDataResult = extendedApiSlice.endpoints.getChartData.select();
export const selectChartData = createSelector(
    selectChartDataResult,
    chartDataResult => chartDataResult.data
)

//Memoized selector for alocation due date
export const selectDueDateResult = extendedApiSlice.endpoints.getDueDate.select();
export const selectDueDateData = createSelector(
  selectDueDateResult,
  dueDateResult => dueDateResult.data
)

//Item selectors
export const {
    selectById: selectUserItemById,
    selectIds: selectItemIds,
    selectAll: selectUserItems
} = itemsAdapter.getSelectors(state => selectItemsData(state) ?? initialState);

// Group selectors
export const {
    selectAll: selectAllGroups,
    selectById: selectGroupById,
    selectIds: selectGroupIds
} = itemsAdapter.getSelectors(state => selectGroupsData(state) ?? initialState);

//Expenses selectors
export const {
    selectAll: selectAllExpenses,
    selectById: selectExpensesById,
    selectIds: selectExpensesIds,
} = itemsAdapter.getSelectors(state => selectExpensesData(state) ?? initialState);


//Chart data selectors 
export const {
    selectAll: selectAllChartData,
} = itemsAdapter.getSelectors(state => selectChartData(state) ?? initialState);

export const {
  selectAll: selectDueDate,
} = itemsAdapter.getSelectors(state => selectDueDateData(state) ?? initialState);

//Budget selector
// export const { 
//     selectAll: selectBudget 
// } = itemsAdapter.getSelectors(state => selectBudgetData(state) ?? initialState);