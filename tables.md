Tablas y Campos
1. users
Almacena la información de todos los usuarios, independientemente de su rol.

id (UUID o Integer): Clave primaria, identificador único.

full_name (VARCHAR): Nombre completo del usuario.

email (VARCHAR): Correo electrónico, debe ser único para la autenticación.

password (VARCHAR): Contraseña hasheada y segura.

role (ENUM o VARCHAR): Define el rol del usuario (estudiante, instructor, admin).

created_at (TIMESTAMP): Fecha de creación del registro.

updated_at (TIMESTAMP): Fecha de la última actualización.

2. courses
Contiene la información de los cursos creados por los instructores.

id (UUID o Integer): Clave primaria.

instructor_id (UUID o Integer): Clave foránea que referencia a users.id (el creador del curso).

title (VARCHAR): Título del curso.

description (TEXT): Descripción detallada del curso.

price (DECIMAL): Precio del curso.

category (VARCHAR): Categoría del curso (ej. "Programación", "Diseño").

created_at (TIMESTAMP): Fecha de creación del curso.

3. enrollments
Maneja la relación entre estudiantes y los cursos en los que están inscritos. Esta es una tabla de unión (o pivote) que gestiona una relación de muchos a muchos.

id (UUID o Integer): Clave primaria.

student_id (UUID o Integer): Clave foránea que referencia a users.id.

course_id (UUID o Integer): Clave foránea que referencia a courses.id.

progress (DECIMAL): Porcentaje de progreso del estudiante en el curso.

completed_at (TIMESTAMP): Fecha de finalización del curso (puede ser nulo).

created_at (TIMESTAMP): Fecha de inscripción.

4. modules
Estructura los cursos en secciones lógicas.

id (UUID o Integer): Clave primaria.

course_id (UUID o Integer): Clave foránea que referencia a courses.id.

title (VARCHAR): Título del módulo.

order (INTEGER): Posición del módulo dentro del curso.

5. lessons
Contiene la información detallada de cada lección.

id (UUID o Integer): Clave primaria.

module_id (UUID o Integer): Clave foránea que referencia a modules.id.

title (VARCHAR): Título de la lección.

content (TEXT): Contenido de la lección (texto, URL de video, etc.).

type (ENUM o VARCHAR): Tipo de contenido (video, text, quiz).

order (INTEGER): Posición de la lección dentro del módulo.

6. quizzes
Almacena los cuestionarios para las lecciones.

id (UUID o Integer): Clave primaria.

lesson_id (UUID o Integer): Clave foránea que referencia a lessons.id.

title (VARCHAR): Título del cuestionario.

7. questions
Guarda las preguntas de los cuestionarios.

id (UUID o Integer): Clave primaria.

quiz_id (UUID o Integer): Clave foránea que referencia a quizzes.id.

question_text (TEXT): El texto de la pregunta.

options (JSONB o TEXT): Almacena las opciones de respuesta.

correct_answer (TEXT): La respuesta correcta.

8. submissions
Registra las respuestas de los estudiantes a los cuestionarios.

id (UUID o Integer): Clave primaria.

student_id (UUID o Integer): Clave foránea que referencia a users.id.

quiz_id (UUID o Integer): Clave foránea que referencia a quizzes.id.

score (INTEGER): Puntuación obtenida.

submitted_at (TIMESTAMP): Fecha de envío de la respuesta.