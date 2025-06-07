import TodosBoard from "@/components/pages/dashboard/todos-board";
import UserNavbar from "@/components/pages/dashboard/user-navbar";
import { GetTodos } from "@/lib/services/todos/todos";
import { useQuery } from "@tanstack/react-query";
export default function DashboardPage() {
	const { data } = useQuery({
		queryFn: () => GetTodos(),
		queryKey: ["dashboard-todos"],
	});
	return (
		<div className="min-h-screen">
			<UserNavbar />
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="mb-8">
					<h2 className="text-2xl font-bold text-gray-900 mb-2">Mis Tareas</h2>
					<p className="text-muted-foreground">
						Gestiona tus tareas pendientes, en progreso y completadas desde
						aquí.
					</p>
				</div>
				<TodosBoard todos={data?.data || []} />

				{/* <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            <Column title="Pending" status="pending" todos={pendingTodos} count={pendingTodos.length} />
            <Column title="In Progress" status="in-progress" todos={inProgressTodos} count={inProgressTodos.length} />
            <Column title="Done" status="done" todos={doneTodos} count={doneTodos.length} />
          </div>

          <div className="md:hidden">
            <MobileListView todos={todos} />
          </div>

          <DragOverlay>
            {activeTodo ? (
              <div className="rotate-3 scale-105">
                <TodoCard todo={activeTodo} isDragging />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext> */}
			</main>
		</div>
	);
}
