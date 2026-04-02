// composable: useTeacher
export const useTeacher = () => {
  const teachers = ref([])

  const fetchTeachers = async (schoolId: string) => {
    // TODO: fetch teachers by school
  }

  return { teachers, fetchTeachers }
}
